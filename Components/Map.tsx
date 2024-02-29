import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	MapMarkerProps,
} from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import * as Location from "expo-location";
import reverseGeocoding from "../utils/reverseGeocoding";


import { TextInput } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Button from "./Button";
import Loader from "./Loader";
import CustomCallout from "./CustomCallout";


export type MarkerWithMetadata = {
	display_name?: string;
	bio?: string;
	profile_id?: number;
	latitude?: number;
	longitude?: number;
	title?: MapMarkerProps["title"];
	description?: MapMarkerProps["description"];
	picture_url?: string;
};
export default function Map() {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [location, setLocation] = useState<any>(null);
	const [latitudeInput, setLatitudeInput] = useState<number>(0);
	const [longitudeInput, setLongitudeInput] = useState<number>(0);
	const [placeId, setPlaceId] = useState<string>("");
	const [users, setUsers] = useState<any>([]);
	const [listingArray, setListingArray] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const { user, setUser, api } = useContext(GlobalStateContext);


	useEffect(() => {
		if (user.latitude === undefined || user.latitude === 0) {
			getLocation().then(() => {
				setLoading(false);
			});
		} else
			getLocation().then(() => {
				setLoading(false);
			});
	}, []);

	const getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		setLatitudeInput(location.coords.latitude);
		setLongitudeInput(location.coords.longitude);
		setUser({
			...user,
			latitude: latitudeInput,
			longitude: longitudeInput,
		});
		updateLocation();
	};
	const updateLocation = async () => {
		await api.patch(`/profile/${user?.profile_id}`, {
			...user,
			latitude: latitudeInput,
			longitude: longitudeInput,
		});
	};

	useEffect(() => {
		(async () => {
			const userArray = await reverseGeocoding.getUsers();
			setUsers(userArray);
			const listings = await reverseGeocoding.getListings();
			return setListingArray(listings);
		})();
	}, [user]);

	useEffect(() => {
		reverseGeocoding.findPlace(placeId).then(({ data }) => {
			setUser({
				...user,
				latitude: data?.result?.geometry?.location?.lat,
				longitude: data?.result?.geometry?.location?.lng,
			});
		});
		updateLocation();
	}, [placeId]);

	const renderMarkers = () => {
		return users.map(
			(
				marker: {
					profile_id: number;
					latitude?: number;
					longitude?: number;
					display_name?: any;
					description: any;
					title?: string | undefined;
					picture_url?: any;
				},
				index: React.Key | null | undefined
			) => (
				<Marker
					key={index}
					coordinate={{
						latitude: marker.latitude ? marker.latitude : 0,
						longitude: marker.longitude ? marker.longitude : 0,
					}}
					icon={require("../assets/hammer-and-wrench.png")}>
					<CustomCallout
						marker={marker}
						listingArray={listingArray}></CustomCallout>
				</Marker>
			)
		);
	};

	return (
		<>
			{!user ? (
				<></>
			) : (

				<>
					{user.latitude === undefined || 0 ? (
						<Loader visible={loading} message={"Loading Map"} />
					) : (
						<View style={styles.container}>
							<MapView
								provider={PROVIDER_GOOGLE} // remove if not using Google Maps
								style={styles.map}
								region={{
									latitude: user.latitude ? user.latitude : latitudeInput,
									longitude: user.longitude ? user.longitude : longitudeInput,
									latitudeDelta: 0.75,
									longitudeDelta: 0.75,
								}}>
								{renderMarkers()}
							</MapView>
							<View style={styles.inputs}>
								<TextInput
									label="Enter postcode..."
									value={address}
									maxLength={8}
									style={styles.inputStyle}
									mode="outlined"
									onChangeText={(value) => {
										setAddress(value);
									}}
									onSubmitEditing={() => {
										reverseGeocoding
											.findAddress(address)
											.then(({ data }) => {
												console.log(data.results[0].geometry);
												setLatitudeInput(data.results[0].geometry.location.lat);
												setLongitudeInput(
													data.results[0].geometry.location.lng
												);
												setPlaceId(data.results[0].place_id);
												setAddress("");
											})
											.catch((err) => {
												console.log(err);
											});
									}}
								/>
								<Button
									label="Device Location"
									onPress={() => {
										getLocation();
									}}
								/>
							</View>
						</View>
					)}
				</>

			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 0,
	},
	inputStyle: {
		alignSelf: "center",
		width: "100%",
		height: 40,
		backgroundColor: "#E0F2F1",
		marginTop: -6,
	},
	map: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	inputs: {
		paddingTop: 10,
		display: "flex",
		flexDirection: "column",
	},
	button: {
		marginTop: 10,
		backgroundColor: GreenTheme.colors.primary,
		borderRadius: 6,
	},
	buttonLabel: {
		fontSize: 16,
		color: '#FFFFFF',
	},
});
