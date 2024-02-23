import React, { useState } from 'react'
import { View, StyleSheet, } from "react-native";
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import AppTitle from '../Components/AppTitle'
import { useNavigation } from '@react-navigation/native'
import { emailValidation, passwordValidation } from '../utils/utils'

const SignUpScreen:React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>('');
  const [password2, setPassword2] = useState<string>('');
  const [secureInputMode, setSecureInputMode] = useState<boolean>(true)

  const onSignUp = () => {
    // not implemented yet
    navigation.navigate("BrowseTools")
  }

  return (
    <View style={styles.container}>
      <AppTitle />
      <Text variant="displaySmall" style={{ marginBottom: 20 }}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={value => setName(value)}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={value => {
          setEmail(value)
          if (!emailValidation(value)) {
            setEmailError('Email address is invalid!');
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
        value={password}
        onChangeText={value => {
          setPassword(value)
          if (!passwordValidation(password, password2).isValid) {
            setPasswordError(passwordValidation(password, password2).error);
          } else {
            setPasswordError(null);
          }
        }}
        secureTextEntry={secureInputMode}
        right={<TextInput.Icon icon={ secureInputMode ? 'eye-off' : 'eye' } onPress={() => setSecureInputMode(!secureInputMode)}/>}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Confirm Password"
        value={password2}
        onChangeText={value => {
          setPassword2(value)
          if (!passwordValidation(password, password2).isValid) {
            setPasswordError(passwordValidation(password, password2).error);
          } else {
            setPasswordError(null);
          }
        }}
        secureTextEntry={secureInputMode}
        right={<TextInput.Icon icon={ secureInputMode ? 'eye-off' : 'eye' } onPress={() => setSecureInputMode(!secureInputMode)}/>}
        style={styles.inputStyle}
        mode="outlined"
      />
      <HelperText type="error" visible={passwordError !== null}>
        { passwordValidation(password, password2).error }
      </HelperText>
      <Button icon="account-plus" mode="contained" onPress={() => onSignUp()} style={{ marginVertical: 20 }}>
        Sign Up
      </Button>
      <Text variant="headlineSmall" style={{ marginBottom: 20 }}>Already have an account?</Text>
      <Button icon="login" mode="contained" onPress={() =>
        navigation.navigate("LogIn")
      } style={{ marginVertical: 10 }}>
        Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  inputStyle: {
    alignSelf: 'stretch',
    marginBottom: 20,
    backgroundColor: '#E0F2F1'
  },
  textMargin: {
    marginBottom: 10
  }

});

export default SignUpScreen;