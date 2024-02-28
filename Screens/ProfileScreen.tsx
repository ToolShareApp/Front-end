import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Avatar, Button, TextInput, Text } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { GreenTheme } from "../Themes/GreenTheme";
import Loader from "../Components/Loader";
import reverseGeocoding from "../utils/reverseGeocoding";

const ProfileScreen = () => {
	const { api, user, setUser } = useContext(GlobalStateContext);
	const [displayName, setDisplayName] = useState(user?.display_name);
	const [bio, setBio] = useState(user?.bio || "");
	const [email, setEmail] = useState(user?.email);
	const [avatarUrl, setAvatarUrl] = useState(user?.picture_url || "");
	const [password, setPassword] = useState(user?.password || "");
	const [formattedAddress, setFormattedAddress] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [address, setAddress] = useState<string>("");
	const [placeId, setPlaceId] = useState<string>("");
	const [reversedLocation, setReverseLocation] = useState<string>("");
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState<number>(0);
	useEffect(() => {
		(async () => {
			reverseGeocoding
				.reverseGeocode(user.latitude, user.longitude)
				.then(({ data }) => {
					setFormattedAddress(data.results[6].formatted_address);
				})
				.catch((err) => {
					console.log(err);
				});
		})();
	});

	const updateProfile = async () => {
		try {
			await api.patch(`/profile/${user.profile_id}`, {
				password,
				email,
				verified: false, // Assuming the verified status is managed server-side and cannot be changed by the client
				display_name: displayName,
				bio,
				latitude: latitude,
				longitude: longitude,
				picture_url: avatarUrl,
				// formattedAddress: formattedAddress,
			});

			const newUserData = {
				...user,
				password,
				email,
				verified: false, // Assuming the verified status is managed server-side and cannot be changed by the client
				display_name: displayName,
				bio,
				latitude: latitude,
				longitude: longitude,
				picture_url: avatarUrl,
				// formattedAddress: formattedAddress,
			};
			setUser(newUserData);
			alert("Profile updated successfully");
			setLoading(false);
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile");
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar.Image
					size={100}
					source={{
						uri: avatarUrl || "https://example.com/default_avatar.png",
					}}
				/>
				<Text>{formattedAddress}</Text>
			</View>
			<TextInput
				label="Display Name"
				value={displayName}
				onChangeText={setDisplayName}
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Bio"
				value={bio}
				onChangeText={setBio}
				multiline
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Email"
				value={email}
				onChangeText={setEmail}
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Avatar URL"
				value={avatarUrl}
				multiline
				onChangeText={setAvatarUrl}
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Enter Postcode"
				value={address}
				mode="outlined"
				maxLength={8}
				style={styles.input}
				onChangeText={(value) => {
					setAddress(value);
				}}
				onSubmitEditing={() => {
					reverseGeocoding
						.findAddress(address)
						.then(({ data }) => {
							setReverseLocation(data.results[0].formatted_address);
							setLatitude(data.results[0].geometry.location.lat);
							setLongitude(data.results[0].geometry.location.lng);
							setAddress("");
						})
						.catch((err) => {
							console.log(err);
						});
				}}
			/>
			<Button mode="contained" onPress={updateProfile} style={styles.button}>
				Update Profile
			</Button>
			<Loader visible={loading} message={"Updating Profile..."} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	avatarContainer: {
		alignItems: "center",
		marginVertical: 20,
	},
	input: {
		marginBottom: 10,
		backgroundColor: GreenTheme.colors.lightEcoBackground,
	},
	button: {
		marginTop: 10,
		backgroundColor: GreenTheme.colors.primary,
	},
});

export default ProfileScreen;
