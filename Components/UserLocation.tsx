import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function UserLocation() {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");

	useEffect(() => {
		(async () => {
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
			console.log(location);
		})();
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
					</MapView>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
	map: {
		width: "75%",
		height: "75%",
	},
});
