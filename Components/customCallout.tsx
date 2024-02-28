// import React from "react";
// import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
// import { Callout } from "react-native-maps";
// import { MarkerWithMetadata } from "./Map";

// const screenWidth = Dimensions.get("window").width;

// const CustomCallout: React.FC<{
// 	marker: MarkerWithMetadata;
// 	listingArray: any;
// }> = ({ marker, listingArray }) => {
// 	let count = 0;
// 	return (
// 		<Callout tooltip>
// 			<View>
// 				<View style={styles.container}>
// 					<Image
// 						source={{
// 							uri: marker.picture_url,
// 						}}
// 						resizeMode="cover"
// 						style={{ width: 10, height: 10 }}></Image>
// 					<View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1 }}>
// 						<Text
// 							style={{
// 								fontWeight: "bold",
// 								fontSize: 18,
// 							}}>
// 							{marker.display_name}
// 						</Text>
// 						<Text
// 							style={{
// 								fontWeight: "normal",
// 								fontSize: 18,
// 							}}>
// 							Listings:
// 							{
// 								listingArray.filter((listing: { owner_id: number }) => {
// 									return listing.owner_id === marker.profile_id;
// 								}).length
// 							}
// 						</Text>
// 					</View>
// 				</View>
// 				<View style={styles.triangle}></View>
// 			</View>
// 		</Callout>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: "white",
// 		width: screenWidth * 0.8,
// 		flexDirection: "row",
// 		borderWidth: 2,
// 		borderRadius: 12,
// 		overflow: "hidden",
// 	},
// 	triangle: {
// 		left: (screenWidth * 0.8) / 2 - 10,
// 		width: 0,
// 		height: 0,
// 		backgroundColor: "transparent",
// 		borderStyle: "solid",
// 		borderTopWidth: 20,
// 		borderRightWidth: 10,
// 		borderBottomWidth: 0,
// 		borderLeftWidth: 10,
// 		borderTopColor: "black",
// 		borderRightColor: "transparent",
// 		borderBottomColor: "transparent",
// 		borderLeftColor: "transparent",
// 	},
// });

// export default CustomCallout;
