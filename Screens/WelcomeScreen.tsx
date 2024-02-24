import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AppTitle from '../Components/AppTitle'
import { GreenTheme } from '../Themes/GreenTheme'
import { useNavigation } from '@react-navigation/native'
const welcomeScreenImage = require('.././assets/welcome-screen-image.webp');

const WelcomeScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>WELCOME</Text>
			<Image
				source={welcomeScreenImage}
				style={styles.image}
			/>
			<AppTitle />
			<Text style={styles.description}>
				Borrow, lend, and save with just a tap. Join our community to make DIY and repairs easy and eco-friendly. Let's build a greener world together!
			</Text>
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => navigation.navigate('LogIn')}>
					Log In
				</Button>
				<Button mode="outlined" onPress={() => navigation.navigate('SignUp')} style={styles.signUpButton}>
					Sign Up
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e0f2f1',
	},
	image: {
		width: 300,
		height: 240,
		marginBottom: 20,
	},
	text: {
		fontSize: 32,
		marginBottom: 10,
		color: GreenTheme.colors.primary,
	},
	description: {
		fontSize: 16,
		lineHeight: 26,
		textAlign: 'center',
		marginHorizontal: 20,
		marginBottom: 20,
		color: GreenTheme.colors.secondaryText,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 50,
	},
	signUpButton: {
		marginLeft: 10,
	},
});

export default WelcomeScreen;
