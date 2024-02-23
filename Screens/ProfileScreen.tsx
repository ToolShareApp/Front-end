import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";

const ProfileScreen:React.FC = () => {
	const { user } = useContext(GlobalStateContext)

	{console.log(user)}
	return (
		<View>
			{/* <Avatar.Image size={150} source={user?.picture_url}/> */}
		</View>
	);
}

export default ProfileScreen;