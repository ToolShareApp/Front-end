import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import Alert from "../Components/Alert";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useNavigation } from "@react-navigation/native";

const LogOutScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(GlobalStateContext);

  const onLogOut = () => {
    setUser(null);
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <AppTitle />
      <Alert error={false}
        text={
          "Are you sure you want to log out? You will need to sign in again to access your account."
        }
      />
      <Button
        icon="logout"
        mode="contained"
        onPress={() => onLogOut()}
        style={{ marginVertical: 20 }}
      >
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
});

export default LogOutScreen;
