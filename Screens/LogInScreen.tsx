import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import { useNavigation } from "@react-navigation/native";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Alert from "../Components/Alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from '../Components/Loader'

const LogInScreen: React.FC = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [secureInputMode, setSecureInputMode] = useState<boolean>(true);
  const [noAccountRecord, setNoAccountRecord] = useState<boolean>(false);
  const [noCorrectPassword, setNoCorrectPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { api, setUser } = useContext(GlobalStateContext);
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchUserData(email: string, password: string) {
    try {
      setLoading(true);
      const apiResponse = await api.get(
        `/profile/email/${email.toLowerCase()}`,
      );
      const {
        data: { data },
      } = apiResponse;

      // Check if the user exists.
      // !! It should be implemented on the backend !!
      if (data.length === 0) {
        setLoading(false);
        setNoAccountRecord(true);
        setPasswordInput("");
        return;
      }

      // Check if the password is correct.
      // !! Never do this on the frontend, it should be implemented on the backend !!
      const userObj = data[0];
      if (userObj.password !== password) {
        setLoading(false);
        setNoCorrectPassword(true);
        setPasswordInput("");
        return;
      }

      // If user is exist and the password is correct, set the user and navigate to 'BrowseTools'.
      setUser(userObj);
      setLoading(false);
      navigation.navigate("BrowseTools");
    } catch (err) {
      setError(true);
    }
  }

  const onLogIn = async () => {
    setNoAccountRecord(false);
    setNoCorrectPassword(false);

    await fetchUserData(emailInput, passwordInput);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <AppTitle />
      <Text
        variant="displaySmall"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Log In
      </Text>
      <TextInput
        label="Email"
        value={emailInput}
        onChangeText={(email) => setEmailInput(email)}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={passwordInput}
        onChangeText={(password) => setPasswordInput(password)}
        secureTextEntry={secureInputMode}
        right={
          <TextInput.Icon
            icon={secureInputMode ? "eye-off" : "eye"}
            onPress={() => {
              setSecureInputMode(!secureInputMode);
            }}
          />
        }
        style={styles.inputStyle}
        mode="outlined"
      />
      {noAccountRecord ? (
        <Alert text={"Sorry, we do not have a record of this account!"} />
      ) : null}
      {noCorrectPassword ? <Alert text={"Password incorrect"} /> : null}
      <Button
        icon="login"
        mode="contained"
        onPress={() => onLogIn()}
        style={{ marginVertical: 20 }}
      >
        Log In
      </Button>
      <Text variant="headlineSmall" style={{ marginBottom: 10, marginTop: 20 }}>
        Don't have an account yet?
      </Text>
      <Button
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginVertical: 20 }}
      >
        Sign Up
      </Button>
      <Loader visible={loading} message={'Loading...'}/>
    </KeyboardAwareScrollView>
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
  inputStyle: {
    alignSelf: "stretch",
    marginBottom: 20,
    backgroundColor: "#E0F2F1",
  },
  textMargin: {
    marginBottom: 10,
  },
});

export default LogInScreen;
