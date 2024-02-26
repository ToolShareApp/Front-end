import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import AppTitle from "../Components/AppTitle";
import { useNavigation } from "@react-navigation/native";
import { emailValidation, passwordValidation } from "../utils/utils";
import GlobalStateContext from "../Contexts/GlobalStateContext";

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { api, setUser } = useContext(GlobalStateContext);
  const [displayNameInput, setDisplayNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordInput2, setPasswordInput2] = useState<string>("");
  const [secureInputMode, setSecureInputMode] = useState<boolean>(true);
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);

  function postNewUser(
    passwordInput: string,
    emailInput: string,
    displayNameInput: string,
    imageUrlInput: string,
  ) {
    return api.post("/profile", {
      password: passwordInput,
      email: emailInput,
      display_name: displayNameInput,
      picture_url: imageUrlInput,
    });
  }

  function getUserByEmail(email: string) {
    return api.get(`/profile/email/${email}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const userObj: object = data[0];
      return userObj;
    });
  }

  const onSignUp = async () => {
    setIsCreatingProfile(true);
    await postNewUser(
      passwordInput,
      emailInput,
      displayNameInput,
      imageUrlInput,
    );
    const newUser = await getUserByEmail(emailInput);
    setUser(newUser);
    navigation.navigate("Profile");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppTitle />
        <Text variant="displaySmall" style={{ marginBottom: 20 }}>
          Sign Up
        </Text>
        <TextInput
          label="Email"
          value={emailInput}
          onChangeText={(value) => {
            setEmailInput(value);
            if (!emailValidation(value)) {
              setEmailError("Email address is invalid!");
            } else {
              setEmailError(null);
            }
          }}
          style={styles.inputStyle}
          mode="outlined"
        />
        <HelperText type="error" visible={emailError !== null}>
          Email address is invalid!
        </HelperText>
        <TextInput
          label="Password"
          value={passwordInput}
          onChangeText={(value) => {
            setPasswordInput(value);
            if (!passwordValidation(passwordInput, passwordInput2).isValid) {
              setPasswordError(
                passwordValidation(passwordInput, passwordInput2).error,
              );
            } else {
              setPasswordError(null);
            }
          }}
          secureTextEntry={secureInputMode}
          right={
            <TextInput.Icon
              icon={secureInputMode ? "eye-off" : "eye"}
              onPress={() => setSecureInputMode(!secureInputMode)}
            />
          }
          style={styles.inputStyle}
          mode="outlined"
        />
        <TextInput
          label="Confirm Password"
          value={passwordInput2}
          onChangeText={(value) => {
            setPasswordInput2(value);
            if (!passwordValidation(passwordInput, passwordInput2).isValid) {
              setPasswordError(
                passwordValidation(passwordInput, passwordInput2).error,
              );
            } else {
              setPasswordError(null);
            }
          }}
          secureTextEntry={secureInputMode}
          right={
            <TextInput.Icon
              icon={secureInputMode ? "eye-off" : "eye"}
              onPress={() => setSecureInputMode(!secureInputMode)}
            />
          }
          style={styles.inputStyle}
          mode="outlined"
        />
        <HelperText type="error" visible={passwordError !== null}>
          {passwordValidation(passwordInput, passwordInput2).error}
        </HelperText>
        <TextInput
          label="Display Name"
          value={displayNameInput}
          onChangeText={(value) => setDisplayNameInput(value)}
          style={styles.inputStyle}
          mode="outlined"
        />
        <Button
          icon="account-plus"
          mode="contained"
          onPress={() => onSignUp()}
          style={{ marginVertical: 20 }}
        >
          Sign Up
        </Button>
        <Text variant="headlineSmall" style={{ marginBottom: 20 }}>
          Already have an account?
        </Text>
        <Button
          icon="login"
          mode="contained"
          onPress={() => navigation.navigate("LogIn")}
          style={{ marginVertical: 10 }}
        >
          Log In
        </Button>
        {isCreatingProfile ? (
          <Text>Creating profile for {displayNameInput}...</Text>
        ) : null}
      </View>
    </ScrollView>
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

export default SignUpScreen;
