import React, { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Callout } from "react-native-maps";
import { MarkerWithMetadata } from "./Map";
import { GreenTheme } from "../Themes/GreenTheme";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const CustomCallout: React.FC<{
	marker: MarkerWithMetadata;
	listingArray: any;
}> = ({ marker, listingArray }) => {
	const { api, user } = useContext(GlobalStateContext);
	const [toolDetails, setToolDetails] = useState<object>();
	const route = useRoute();
	const navigation = useNavigation();

	const { listing_id } = route.params;

	const createNewChat = () => {
		return api.post("/chat/", {
			listingId: listing_id,
			userId: user?.profile_id,
		});
	};

	function startChat() {
		const owner_id: number = toolDetails?.owner_id;
		if (toolDetails?.owner_id === user?.profile_id) {
			alert("Sorry, you can't create a chat with yourself");
			return;
		}
		createNewChat()
			.then((response) => {
				if (response?.data?.recordId) {
					const recordId = response?.data?.recordId;

					console.log({
						user_id: owner_id,
						title: ownerName,
						tool_name: toolName,
						listing_id,
						recordId,
					});
					// @ts-ignore
					navigation.navigate("Messages", {
						screen: "ChatScreen",
						params: {
							user_id: owner_id,
							title: ownerName,
							tool_name: toolName,
							listing_id,
							recordId,
						},
					});
				}
			})
			.catch((error) => {
				setToast(true);
				console.error(error);
			});
	}

	return (
		<Callout
			tooltip
			onPress={() => {
				startChat();
			}}>
			<View>
				<View style={styles.container}>
					<View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1 }}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								textAlign: "center",
							}}>
							{marker.display_name}
						</Text>
						<Text
							style={{
								fontWeight: "normal",
								fontSize: 18,
								textAlign: "center",
							}}>
							Listings:
							{
								listingArray.filter((listing: { owner_id: number }) => {
									return listing.owner_id === marker.profile_id;
								}).length
							}
						</Text>
					</View>
				</View>
				<View style={styles.triangle}></View>
			</View>
		</Callout>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: GreenTheme.colors.surface,
		width: screenWidth * 0.4,
		flexDirection: "row",
		borderWidth: 2,
		borderRadius: 12,
		overflow: "hidden",
		color: GreenTheme.colors.darkText,
		borderColor: GreenTheme.colors.darkText,
	},
	triangle: {
		left: (screenWidth * 0.4) / 2 - 10,
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderTopWidth: 20,
		borderRightWidth: 10,
		borderBottomWidth: 0,
		borderLeftWidth: 10,
		borderTopColor: GreenTheme.colors.darkText,
		borderRightColor: "transparent",
		borderBottomColor: "transparent",
		borderLeftColor: "transparent",
	},
});

export default CustomCallout;
