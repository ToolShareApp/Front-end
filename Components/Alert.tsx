import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

interface AlertProps {
  text: string;
}

const Alert: React.FC<AlertProps> = ({ text }) => {
  return (
    <View style={styles.warning}>
      <Icon source="alert" color="orange" size={36} />
      <Text style={{ marginLeft: 10 }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warning: {
    color: "black",
    backgroundColor: "rgba(255,217,2,0.47)",
    padding: 10,
    marginTop: 40,
    borderColor: "#ffd902",
    borderWidth: 2,
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    margin: 20,
  },
});

export default Alert;
