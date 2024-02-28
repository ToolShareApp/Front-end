import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	MapMarkerProps,
} from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect, useContext } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import * as Location from "expo-location";
import reverseGeocoding from "../utils/reverseGeocoding";
//import Button from "./Button";
import { TextInput } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Button from "./Button";
import CustomCallout from "./customCallout";
import { set } from "date-fns";

export type MarkerWithMetadata = {
	display_name: string;
	bio: string;
	profile_id: number;
	latitude?: number;
	longitude?: number;
	title?: MapMarkerProps["title"];
	description?: MapMarkerProps["description"];
	picture_url?: string;
};

export default function Map() {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [reversedLocation, setReverseLocation] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [location, setLocation] = useState<any>(null);
	const [latitudeInput, setLatitudeInput] = useState<number>(0);
	const [longitudeInput, setLongitudeInput] = useState<number>(0);
	const [placeId, setPlaceId] = useState<string>("");
	const [users, setUsers] = useState<any>([]);
	const [listingArray, setListingArray] = useState<any>([]);
	const { user, setUser, api } = useContext(GlobalStateContext);

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
	};

	const updateLocation = async () => {
		await api.patch(`/profile/${user.profile_id}`, {
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
				latitude: data.result.geometry.location.lat,
				longitude: data.result.geometry.location.lng,
			});
		});
		updateLocation();
	}, [placeId]);

	// if owner id === marker id display listings
	const renderMarkers = () => {
		return users.map(
			(
				marker: {
					profile_id: number;
					latitude?: any;
					longitude?: any;
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
						latitude: marker.latitude,
						longitude: marker.longitude,
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
			{errorMsg ? (
				<Text>{errorMsg}</Text>
			) : (
				<View style={styles.container}>
					<MapView
						provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						style={styles.map}
						region={{
							latitude: latitudeInput,
							longitude: longitudeInput,
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
										setReverseLocation(data.results[0].formatted_address);
										setLatitudeInput(data.results[0].geometry.location.lat);
										setLongitudeInput(data.results[0].geometry.location.lng);

										setPlaceId(data.results[0].place_id);
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingBottom: 50,
	},
	inputStyle: {
		alignSelf: "center",
		width: "40%",
		backgroundColor: "#E0F2F1",
	},
	map: {
		width: "95%",
		height: "75%",
	},
	inputs: {
		flexDirection: "row",
	},
});
