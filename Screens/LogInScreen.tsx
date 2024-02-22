import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import { useNavigation } from "@react-navigation/native";

const LogInScreen: React.FC = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	const onLogIn = async () => {
		try {
			// await signIn({ email, password });
			// navigation.navigate('Profile');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<AppTitle />
			<Text variant="displaySmall" style={{ marginBottom: 20 }}>
				Log In
			</Text>
			<TextInput
				label="Email"
				value={email}
				onChangeText={(email) => setEmail(email)}
				style={styles.inputStyle}
				mode="outlined"
			/>
			<TextInput
				label="Password"
				secureTextEntry
				right={<TextInput.Icon icon="eye" />}
				style={styles.inputStyle}
				mode="outlined"
			/>
			<Button
				icon="login"
				mode="contained"
				onPress={() => onLogIn()}
				style={{ marginVertical: 20 }}>
				Log In
			</Button>
			<Text variant="headlineSmall" style={{ marginBottom: 10, marginTop: 20 }}>
				Don't have an account yet?
			</Text>
			<Button
				icon="account-plus"
				mode="contained"
				onPress={() => navigation.navigate("SignUp")}
				style={{ marginVertical: 20 }}>
				Sign Up
			</Button>
		</View>
	);
};

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
});

export default LogInScreen;
