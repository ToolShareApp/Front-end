import React, { useState } from 'react'
import { View, StyleSheet, } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper'
import AppTitle from '../Components/AppTitle'

const SignUpScreen:React.FC = () => {
  const [name, setName] = useState<string>()

  const onSignUp = () => {
  }
  return (
    <View style={styles.container}>
      <AppTitle />
      <Text variant="displaySmall" style={{ marginBottom: 20 }}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={name => setName(name)}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={name}
        onChangeText={name => setName(name)}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        style={styles.inputStyle}
        mode="outlined"
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        style={styles.inputStyle}
        mode="outlined"
      />
      <Button icon="account-plus" mode="contained" onPress={() => onSignUp()} style={{ marginVertical: 20 }}>
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

export default SignUpScreen;