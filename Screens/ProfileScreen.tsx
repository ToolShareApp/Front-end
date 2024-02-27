import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Avatar, Button, TextInput, Text } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { GreenTheme } from "../Themes/GreenTheme"; // Убедитесь, что путь к контексту указан правильно

const ProfileScreen = () => {
	const { api, user, setUser } = useContext(GlobalStateContext);
	const [displayName, setDisplayName] = useState(user.display_name);
	const [bio, setBio] = useState(user.bio || "");
	const [email, setEmail] = useState(user.email);
	const [avatarUrl, setAvatarUrl] = useState(user.picture_url || "");
	const [password, setPassword] = useState(user.password || "");
	const [latitude, setLatitude] = useState(String(user.latitude));
	const [longitude, setLongitude] = useState(String(user.longitude));
	const [searchRadius, setSearchRadius] = useState(String(user.search_radius));

	const updateProfile = async () => {
		try {
			await api.patch(`/profile/${user?.profile_id}`, {
				password,
				email,
				verified: false, // Assuming the verified status is managed server-side and cannot be changed by the client
				display_name: displayName,
				bio,
				latitude: latitude,
				longitude: longitude,
				search_radius: parseInt(searchRadius, 10),
				picture_url: avatarUrl,
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
				search_radius: parseInt(searchRadius, 10),
				picture_url: avatarUrl,
			};
			setUser(newUserData);
			alert("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile");
		}
	};
	console.log(user);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar.Image
					size={100}
					source={{
						uri: avatarUrl || "https://example.com/default_avatar.png",
					}}
				/>
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
				onChangeText={setAvatarUrl}
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Latitude"
				value={latitude}
				onChangeText={setLatitude}
				keyboardType="numeric"
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Longitude"
				value={longitude}
				onChangeText={setLongitude}
				keyboardType="numeric"
				mode="outlined"
				style={styles.input}
			/>
			<TextInput
				label="Search Radius"
				value={searchRadius}
				onChangeText={setSearchRadius}
				keyboardType="numeric"
				mode="outlined"
				style={styles.input}
			/>
			<Button mode="contained" onPress={updateProfile} style={styles.button}>
				Update Profile
			</Button>
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
