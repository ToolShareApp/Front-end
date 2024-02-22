import { createDrawerNavigator } from "@react-navigation/drawer";
import BrowseToolsScreen from "../Screens/BrowseToolsScreen";
import MyToolsScreen from "../Screens/MyToolsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import MessagesScreen from "../Screens/MessagesScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import { Icon } from "react-native-paper";
import LogOutScreen from "../Screens/LogOutScreen";
import LogInScreen from "../Screens/LogInScreen";
import { GreenDrawerTheme } from "../Themes/GreenTheme";
import UserLocation from "./UserLocation";

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
	return (
		<Drawer.Navigator initialRouteName={"LogIn"}>
			<Drawer.Screen
				name="BrowseTools"
				component={BrowseToolsScreen}
				options={{ title: "🔍 Browse Tools" }}
			/>
			<Drawer.Screen
				name="MyTools"
				component={MyToolsScreen}
				options={{ title: "🛠️ My Tools" }}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ title: "👤 Profile" }}
			/>
			<Drawer.Screen
				name="Messages"
				component={MessagesScreen}
				options={{ title: "💬 Messages" }}
			/>
			<Drawer.Screen
				name="Map"
				component={UserLocation}
				options={{ title: "Map" }}
			/>
			<Drawer.Screen
				name="LogIn"
				component={LogInScreen}
				options={{
					title: "Log In",
					drawerIcon: ({ focused, size }) => (
						<Icon
							source="login"
							color={focused ? "#08480a" : "#0c600f"}
							size={size}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name="SignUp"
				component={SignUpScreen}
				options={{
					title: "Sign Up",
					drawerIcon: ({ focused, size }) => (
						<Icon
							source="account-plus"
							color={focused ? "#08480a" : "#0c600f"}
							size={size}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name="LogOut"
				component={LogOutScreen}
				options={{
					title: "Log Out",
					drawerIcon: ({ size }) => (
						<Icon source="logout" color="red" size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default AppNavigator;
