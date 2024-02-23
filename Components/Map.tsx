import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import reverseGeocoding from "../utils/reverseGeocoding";
import Button from "./Button";
import { TextInput } from "react-native-paper";

export default function Map() {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [reversedLocation, setReverseLocation] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	//const locationArray = [location, "latitude: 35, longitude: -120,"];

	console.log(location);
	async function getLocation() {
		// if (Platform.OS === "android" && !Device.isDevice) {
		// 	setErrorMsg(
		// 		"Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
		// 	);
		// 	return;
		// }
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}
		//if permission is denied. alert to ask to change. send user to settings

		let location: any = await Location.getCurrentPositionAsync({});
		setLocation(location);
		let reversedLocation: any = await reverseGeocoding.reverseGeocode(
			location?.coords.latitude,
			location?.coords.longitude
		);
		setReverseLocation(reversedLocation.data.results[0].formatted_address);
	}
	useEffect(() => {
		getLocation();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<>
			{!location ? (
				<Text>Loading</Text>
			) : (
				<View style={styles.container}>
					<MapView
						provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						style={styles.map}
						region={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121,
						}}>
						<Marker
							coordinate={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
							}}
						/>
						<Marker
							coordinate={{
								latitude: 35,
								longitude: -120,
							}}
						/>
					</MapView>
					{/* <Text>
						Location: {location?.coords.latitude} {location?.coords.longitude}
					</Text> */}
					<Text>Formatted Address: {reversedLocation}</Text>
					<Button
						label="Update Location"
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
		padding: 20,
	},
	inputStyle: {
		alignSelf: "stretch",
		marginBottom: 20,
		backgroundColor: "#E0F2F1",
	},
	textMargin: {
		marginBottom: 10,
	},
	map: {
		width: "75%",
		height: "50%",
	},
});
