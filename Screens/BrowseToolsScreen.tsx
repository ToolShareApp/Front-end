import React from "react";
import { View } from "react-native";

import ToolsList from "../Components/ToolsList";
import Map from "../Components/Map";

const BrowseToolsScreen: React.FC = (location) => {
	console.log(location);
	return (
		<>
			<View style={{ height: "50%" }}>
				<Map />
			</View>
			<View style={{ height: "50%" }}>
				<ToolsList />
			</View>
		</>
	);
};

export default BrowseToolsScreen;
