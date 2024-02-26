import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import reverseGeocoding from "../utils/reverseGeocoding";
//import Button from "./Button";
import { TextInput } from "react-native-paper";

export default function Map() {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [reversedLocation, setReverseLocation] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	//const locationArray = [location, "latitude: 35, longitude: -120,"];
	//console.log(location);
	//console.log(reversedLocation);

	return (
		<>
			{!reversedLocation ? (
				//<Text>Loading</Text>
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
							//console.log(data);
						});
					}}
				/>
			) : (
				<View style={styles.container}>
					<MapView
						provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						style={styles.map}
						region={{
							// latitude: location.coords.latitude,
							// longitude: location.coords.longitude,
							latitude: 52.584235174582595,
							longitude: -0.23529274510057102,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121,
						}}>
						<Marker
							coordinate={{
								// latitude: location.coords.latitude,
								// longitude: location.coords.longitude,
								latitude: 52.584235174582595,
								longitude: -0.23529274510057102,
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
					{/* <Text>Your Location: {reversedLocation}</Text>
					<Button
						label="Update Location"
						onPress={() => {
							getLocation();
						}}
					/> */}
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
								console.log(data);
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
