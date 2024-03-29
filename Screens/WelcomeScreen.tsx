import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import { GreenTheme } from "../Themes/GreenTheme";
import * as Location from "expo-location";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GlobalStateContext from "../Contexts/GlobalStateContext";
const welcomeScreenImage = require(".././assets/welcome-screen-image.webp");

const WelcomeScreen = () => {
	const navigation = useNavigation();
	const { user } = useContext(GlobalStateContext);
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [latitudeInput, setLatitudeInput] = useState<number>(0);
	const [longitudeInput, setLongitudeInput] = useState<number>(0);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setLatitudeInput(location.coords.latitude);
			setLongitudeInput(location.coords.longitude);
		})();
	}, []);
	useFocusEffect(
		React.useCallback(() => {
			if (user) {
				navigation.navigate("BrowseTools");
			}
		}, [user])
	);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>WELCOME</Text>
			<Image source={welcomeScreenImage} style={styles.image} />
			<AppTitle />
			<Text style={styles.description}>
				Borrow, lend, and save with just a tap. Join our community to make DIY
				and repairs easy and eco-friendly. Let's build a greener world together!
			</Text>
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => navigation.navigate("LogIn")}>
					Log In
				</Button>
				<Button
					mode="outlined"
					onPress={() => navigation.navigate("SignUp")}
					style={styles.signUpButton}>
					Sign Up
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: GreenTheme.colors.lightEcoBackground,
	},
	image: {
		width: 300,
		height: 240,
		marginBottom: 20,
	},
	text: {
		fontSize: 32,
		marginBottom: 10,
		color: GreenTheme.colors.primary,
	},
	description: {
		fontSize: 16,
		lineHeight: 26,
		textAlign: "center",
		marginHorizontal: 20,
		marginBottom: 20,
		color: GreenTheme.colors.secondaryText,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingHorizontal: 50,
	},
	signUpButton: {
		marginLeft: 10,
	},
});

export default WelcomeScreen;
