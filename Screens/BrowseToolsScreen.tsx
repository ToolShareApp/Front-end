import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import ToolsList from "../Components/ToolsList";

const BrowseToolsScreen: React.FC = () => {
	return (
		<>
			<KeyboardAvoidingView style={styles.container}>
				<View style={styles.container}>
					<ToolsList />
				</View>
			</KeyboardAvoidingView>
		</>
	);
};

export default BrowseToolsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
});
