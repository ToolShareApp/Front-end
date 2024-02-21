import React from "react";
import { View } from "react-native";
import Button from "../Components/Button";

interface ProfileScreenProps {}

const ProfileScreen:React.FC<ProfileScreenProps> = () => {

	const onLogOut = () => {
		// trigger logout of curent user account
	}
	return (
		<View>
			<Button onPress={onLogOut} label={"Log out"}/>
		</View>
	);
}

export default ProfileScreen;