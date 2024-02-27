import React from "react";
import { KeyboardAvoidingView, View } from "react-native";

import ToolsList from "../Components/ToolsList";
import Map from "../Components/Map";

const BrowseToolsScreen: React.FC = () => {
	return (
		<>
			<KeyboardAvoidingView>
				<View style={{ height: "50%" }}>
					<Map />
				</View>
				<View style={{ height: "50%" }}>
					<ToolsList />
				</View>
			</KeyboardAvoidingView>
		</>
	);
};

export default BrowseToolsScreen;
