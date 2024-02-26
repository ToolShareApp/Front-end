import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import reverseGeocoding from "../utils/reverseGeocoding";
//import Button from "./Button";
import { TextInput } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Button from "./Button";

export default function Map() {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [reversedLocation, setReverseLocation] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [location, setLocation] = useState<any>(null);
	const [latitudeInput, setLatitudeInput] = useState<number>(0);
	const [longitudeInput, setLongitudeInput] = useState<number>(0);
	const [placeId, setPlaceId] = useState<string>("");
	const [users, setUsers] = useState<any>([]);

	const { user, setUser } = useContext(GlobalStateContext);

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
	useEffect(() => {
		getLocation();
		reverseGeocoding.getUsers().then((res) => {
			setUsers(res);
		});
	}, []);
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
							latitude: user.latitude,
							longitude: user.longitude,
							latitudeDelta: 0.75,
							longitudeDelta: 0.75,
						}}>
						{users.map(
							(
								marker: {
									latitude: any;
									longitude: any;
									profile_id: string | undefined;
								},
								i: React.Key | null | undefined
							) => {
								return (
									<>
										<Marker
											key={i}
											identifier={`id${i}`}
											icon={require("../assets/hammer-and-wrench.png")}
											coordinate={{
												latitude: marker.latitude,
												longitude: marker.longitude,
											}}
											tappable
											onPress={() => {
												console.log(marker.profile_id);
											}}
										/>
									</>
								);
							}
						)}
					</MapView>
					<Button
						label="Device Location"
						onPress={() => {
							getLocation();
						}}
					/>
					<TextInput
						label="Enter your postcode"
						value={address}
						maxLength={8}
						style={styles.inputStyle}
						mode="outlined"
						onChangeText={(value) => {
							setAddress(value);
						}}
						onSubmitEditing={() => {
							reverseGeocoding.findAddress(address).then(({ data }: any) => {
								setReverseLocation(data.results[0].formatted_address);
								setPlaceId(data.results[0].place_id);
								return reverseGeocoding.findPlace(placeId).then(({ data }) => {
									console.log(data.result.geometry.location);
									setUser({
										...user,
										latitude: data.result.geometry.location.lat,
										longitude: data.result.geometry.location.lng,
									});
								});
							});
						}}
					/>
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
		width: "90%",
		backgroundColor: "#E0F2F1",
	},
	map: {
		width: "95%",
		height: "75%",
	},
});
