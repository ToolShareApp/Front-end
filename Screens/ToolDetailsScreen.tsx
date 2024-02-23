import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useRoute } from "@react-navigation/native";

const ToolDetailsScreen: React.FC = () => {
	const { api } = useContext(GlobalStateContext);
	const [toolDetails, setToolDetails] = useState<object>();
	const route = useRoute();

	function getToolByToolId(listing_id: number) {
		return api.get(`/listing/${listing_id}`).then((apiResponse: any) => {
			const {
				data: { data },
			} = apiResponse;
			return data;
		});
	}

	useEffect(() => {
		const { listing_id } = route.params;
		getToolByToolId(listing_id).then((response: any) => {
			const tool = response[0];
			setToolDetails(tool);
		});
	}, []);

	return (
		<View style={styles.toolDetails}>
			<Text>working?</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	toolDetails: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ToolDetailsScreen;
