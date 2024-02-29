import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import { useNavigation } from "@react-navigation/native";
import { emailValidation, passwordValidation } from "../utils/utils";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Alert from "../Components/Alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../Components/Loader";
import * as Location from "expo-location";

const SignUpScreen: React.FC = () => {
	const navigation = useNavigation();
	const { api, setUser } = useContext(GlobalStateContext);
	const [displayNameInput, setDisplayNameInput] = useState<string>("");
	const [emailInput, setEmailInput] = useState<string>("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordInput, setPasswordInput] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [passwordInput2, setPasswordInput2] = useState<string>("");
	const [secureInputMode, setSecureInputMode] = useState<boolean>(true);
	const [imageUrlInput, setImageUrlInput] = useState<string>("");
	const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);
	const [createProfileError, setCreateProfileError] = useState<any>("");
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [latitudeInput, setLatitudeInput] = useState<number>(0);
	const [longitudeInput, setLongitudeInput] = useState<number>(0);

	const getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let location: any = await Location.getCurrentPositionAsync({});
		setLocation(location);
		setLatitudeInput(location.coords.latitude);
		setLongitudeInput(location.coords.longitude);
	};

	useEffect(() => {
		getLocation();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	function postNewUser(
		passwordInput: string,
		emailInput: string,
		displayNameInput: string,
		imageUrlInput: string,
		latitudeInput: number,
		longitudeInput: number
	) {
		return api.post("/profile", {
			password: passwordInput,
			email: emailInput.toLowerCase(),
			display_name: displayNameInput,
			picture_url: imageUrlInput,
			latitude: latitudeInput,
			longitude: longitudeInput,
		});
	}

	function getUserByEmail(email: string) {
		return api.get(`/profile/email/${email}`).then((apiResponse) => {
			const {
				data: { data },
			} = apiResponse;
			const userObj: object = data[0];
			return userObj;
		});
	}

	const onSignUp = async () => {
		try {
			setIsCreatingProfile(true);
			await postNewUser(
				passwordInput,
				emailInput,
				displayNameInput,
				imageUrlInput,
				latitudeInput,
				longitudeInput
			);
			const newUser = await getUserByEmail(emailInput);
			setUser(newUser);
			navigation.navigate("Profile");
		} catch (error) {
			setCreateProfileError(error);
		} finally {
			setIsCreatingProfile(false);
		}
	};
	return (
		<KeyboardAwareScrollView>
			<View style={styles.container}>
				<AppTitle />
				<Text variant="displaySmall" style={{ marginBottom: 20 }}>
					Sign Up
				</Text>
				<TextInput
					label="Email"
					value={emailInput}
					onChangeText={(value) => {
						setEmailInput(value);
						if (!emailValidation(value)) {
							setEmailError("Email address is invalid!");
						} else {
							setEmailError(null);
						}
					}}
					style={styles.inputStyle}
					mode="outlined"
				/>
				<HelperText
					style={styles.helperStyle}
					type="error"
					visible={emailInput !== "" && emailError}>
					Email address is invalid!
				</HelperText>
				<TextInput
					label="Password"
					value={passwordInput}
					onChangeText={(value) => {
						setPasswordInput(value);
						if (!passwordValidation(passwordInput, passwordInput2).isValid) {
							setPasswordError(
								passwordValidation(passwordInput, passwordInput2).error
							);
						} else {
							setPasswordError(null);
						}
					}}
					secureTextEntry={secureInputMode}
					right={
						<TextInput.Icon
							icon={secureInputMode ? "eye-off" : "eye"}
							onPress={() => setSecureInputMode(!secureInputMode)}
						/>
					}
					style={styles.inputStyle}
					mode="outlined"
				/>
				<HelperText style={styles.helperStyle} type="error" visible={false}>
					Please repeat your password
				</HelperText>
				<TextInput
					label="Confirm Password"
					value={passwordInput2}
					onChangeText={(value) => {
						setPasswordInput2(value);
						if (!passwordValidation(passwordInput, passwordInput2).isValid) {
							setPasswordError(
								passwordValidation(passwordInput, passwordInput2).error
							);
						} else {
							setPasswordError(null);
						}
					}}
					secureTextEntry={secureInputMode}
					right={
						<TextInput.Icon
							icon={secureInputMode ? "eye-off" : "eye"}
							onPress={() => setSecureInputMode(!secureInputMode)}
						/>
					}
					style={styles.inputStyle}
					mode="outlined"
				/>
				<HelperText
					style={styles.helperStyle}
					type="error"
					visible={passwordInput !== "" && passwordError}>
					{passwordError}
				</HelperText>
				<TextInput
					label="Display Name"
					value={displayNameInput}
					onChangeText={(value) => setDisplayNameInput(value)}
					style={styles.inputStyle}
					mode="outlined"
				/>
				<Button
					icon="account-plus"
					mode="contained"
					onPress={() => onSignUp()}
					style={{ marginVertical: 20 }}>
					Sign Up
				</Button>
				<Text variant="headlineSmall" style={{ marginBottom: 20 }}>
					Already have an account?
				</Text>
				<Button
					icon="login"
					mode="contained"
					onPress={() => navigation.navigate("LogIn")}
					style={{ marginVertical: 10 }}>
					Log In
				</Button>
				{isCreatingProfile ? (
					<Loader
						visible={isCreatingProfile}
						message={`Creating profile for ${displayNameInput}...`}
					/>
				) : null}
				{createProfileError !== "" ? (
					<Alert
						error
						text={
							"Unfortunately, an error occurred while trying to create a new profile. Please try again."
						}
					/>
				) : null}
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 20,
		minHeight: "100%",
	},
	inputStyle: {
		alignSelf: "stretch",
		backgroundColor: "#E0F2F1",
	},
	helperStyle: {
		padding: 0,
		margin: 0,
	},
	textMargin: {
		marginBottom: 10,
	},
});

export default SignUpScreen;
