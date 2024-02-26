import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import BrowseToolsScreen from "../Screens/BrowseToolsScreen";
import MyToolsScreen from "../Screens/MyToolsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ToolDetailsScreen from "../Screens/ToolDetailsScreen";
import { Icon } from "react-native-paper";
import LogOutScreen from "../Screens/LogOutScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import LogInScreen from "../Screens/LogInScreen";
import Logo from "./Logo";
import { StyleSheet, View } from "react-native";
import ChatScreen from "../Screens/ChatScreen";
import ChatsListScreen from "../Screens/ChatsListScreen";
import { GreenTheme } from "../Themes/GreenTheme";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import WelcomeScreen from "../Screens/WelcomeScreen";

const Drawer = createDrawerNavigator();
const ToolsStack = createStackNavigator();
const ChatStack = createStackNavigator();

const DrawerNavigator: React.FC = () => {
  const { user } = useContext(GlobalStateContext);

  return (
    <Drawer.Navigator
      initialRouteName={user ? "BrowseTools" : "Welcome"}
      screenOptions={{
        headerStyle: {
          backgroundColor: GreenTheme.colors.primary, // Apply background color to the header
        },
        headerTintColor: GreenTheme.colors.background, // Apply color to the header items (title, back button)
        drawerStyle: {
          backgroundColor: GreenTheme.colors.background, // Apply background color to the drawer
        },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView>
          <View style={styles.drawerLogo}>
            <Logo size={80} />
          </View>

          {!user ? (
            <>
              <DrawerItem
                label={"Welcome"}
                onPress={() => {
                  props.navigation.navigate("Welcome");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="leaf"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"Log In"}
                onPress={() => {
                  props.navigation.navigate("LogIn");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="login"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"Sign Up"}
                onPress={() => {
                  props.navigation.navigate("SignUp");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="account-plus"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
            </>
          ) : (
            <>
              <DrawerItem
                label={"Browse Tools"}
                onPress={() => {
                  props.navigation.navigate("BrowseTools");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="map-search"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"My Tools"}
                onPress={() => {
                  props.navigation.navigate("MyTools");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="hammer-wrench"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"Profile"}
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="account"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"Messages"}
                onPress={() => {
                  props.navigation.navigate("Messages");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="forum-outline"
                    color={
                      focused
                        ? GreenTheme.colors.accent
                        : GreenTheme.colors.primary
                    }
                    size={size}
                  />
                )}
              />
              <DrawerItem
                label={"Log Out"}
                onPress={() => {
                  props.navigation.navigate("LogOut");
                }}
                icon={({ focused, size }) => (
                  <Icon
                    source="logout"
                    color={
                      focused
                        ? GreenTheme.colors.warning
                        : GreenTheme.colors.error
                    }
                    size={size}
                  />
                )}
              />
            </>
          )}
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="BrowseTools"
        component={ToolsStackNavigator}
        options={{ title: "Browse Tools" }}
      />
      <Drawer.Screen
        name="MyTools"
        component={MyToolsScreen}
        options={{ title: "My Tools" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Drawer.Screen
        name="Messages"
        component={ChatStackNavigator}
        options={{ title: "Messages" }}
      />
      <Drawer.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ title: "Log In" }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />

      <Drawer.Screen
        name="LogOut"
        component={LogOutScreen}
        options={{ title: "Log Out" }}
      />
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Tools for Earth's Care" }}
      />
    </Drawer.Navigator>
  );
};

const ToolsStackNavigator: React.FC = () => {
  return (
    <ToolsStack.Navigator
      screenOptions={{
        headerTintColor: GreenTheme.colors.primary, // Apply color to the header items (title, back button)
      }}
    >
      <ToolsStack.Screen
        name="ToolsList"
        component={BrowseToolsScreen}
        options={{ title: "Tools List" }}
      />
      <ToolsStack.Screen
        name="ToolDetailsScreen"
        component={ToolDetailsScreen}
        options={{ title: "Details" }}
      />
    </ToolsStack.Navigator>
  );
};

const ChatStackNavigator: React.FC = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTintColor: GreenTheme.colors.primary, // Apply color to the header items (title, back button)
      }}
    >
      <ChatStack.Screen
        name="ChatsList"
        component={ChatsListScreen}
        options={{ title: "Chats" }}
      />
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </ChatStack.Navigator>
  );
};

export { DrawerNavigator };

const styles = StyleSheet.create({
  drawerLogo: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
  },
});
