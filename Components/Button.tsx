import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

interface ButtonProps {
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, label }) => {
  return (
    <PaperButton style={styles.button} mode="contained" onPress={onPress}>
      {label}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 15,
    padding: 3,
    borderRadius: 10,
  },
});

export default Button;
