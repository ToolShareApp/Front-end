import React, { useContext, useState } from 'react'
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper'
import AppTitle from '../Components/AppTitle'
import { useNavigation } from '@react-navigation/native'
import GlobalStateContext from '../Contexts/GlobalStateContext';
import Alert from '../Components/Alert'

const LogInScreen:React.FC = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [secureInputMode, setSecureInputMode] = useState<boolean>(true)
  const [noAccountRecord, setNoAccountRecord] = useState<boolean>(false);
  const { api, setUser, user } = useContext(GlobalStateContext)

  function checkForExistingUser(email: string) {
    return api.get(`/profile/email/${email}`)
      .then((apiResponse) => {
      const { data : { data } } = apiResponse
      const userExists = data.length !== 0;
      return userExists
      });
  }
  // Sarah@domain.com test email
  // password test password
  function getUserByEmail(email: string) {
    return api.get(`/profile/email/${email}`)
    .then((apiResponse) => {
      const { data : { data } } = apiResponse
      const userObj = data[0]
      return userObj
    })
  }

  const onLogIn = () => {
    checkForExistingUser(emailInput)
    .then((response) => {
      if (response) {
        getUserByEmail(emailInput) 
        .then((response) => {
          setUser(response)
          navigation.navigate('BrowseTools')
        })
        } else {
          setNoAccountRecord(true)
        }
    })
  };

  return (
    <View style={styles.container}>
      <AppTitle />
      <Text variant="displaySmall" style={{ marginBottom: 20 }}>Log In</Text>
      <TextInput
        label="Email"
        value={emailInput}
        onChangeText={email => setEmailInput(email)}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={passwordInput}
        onChangeText={password => setPasswordInput(password)}
        secureTextEntry={secureInputMode}
        right={<TextInput.Icon icon={ secureInputMode ? 'eye-off' : 'eye'} onPress={() => {setSecureInputMode(!secureInputMode)}}/>}
        style={styles.inputStyle}
        mode="outlined"
      />
      { noAccountRecord ? <Alert text={'Sorry, we do not have a record of this account!'}/> : null}
      <Button icon="login" mode="contained" onPress={() => onLogIn()} style={{ marginVertical: 20 }}>
        Log In
      </Button>
      <Text variant="headlineSmall" style={{ marginBottom: 10, marginTop: 20 }}>Don't have an account yet?</Text>
      <Button icon="account-plus" mode="contained" onPress={() =>
        navigation.navigate("SignUp")
      } style={{ marginVertical: 20 }}>
        Sign Up
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

export default LogInScreen;