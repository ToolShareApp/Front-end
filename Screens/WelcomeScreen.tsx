import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Components/Button";

const WelcomeScreen:React.FC = () => {

    function handleButtonPress() {
        // take user to log in / sign up screen
    }

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Welcome to ToolShare! 🛠️</Text>
			<Text style={styles.about}>
				ToolShare is a community-based application where we
				encourage people to share any tools they have lying around with people
				in their local community, and in return, they can borrow tools from
				others. Sharing is caring!
			</Text>
			<Button onPress={handleButtonPress} label="Enter"/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		alignItems: "center",
		alignSelf: "center",
	},
	header: {
		fontSize: 40,
		textAlign: "center",
	},
	about: {
		margin: 20,
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 15,
	}
});

export default WelcomeScreen;