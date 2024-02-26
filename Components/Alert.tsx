import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";
import { GreenTheme } from "../Themes/GreenTheme";

interface AlertProps {
  text: string;
  error: boolean;
}

const Alert: React.FC<AlertProps> = ({ text, error }) => {
  return (
    <View style={[styles.warning, error && styles.warningError]}>
      <Icon
        source="alert"
        color={error ? GreenTheme.colors.lightText : GreenTheme.colors.text}
        size={36}
      />

      <Text
        style={[
          styles.text,
          {
            color: error ? GreenTheme.colors.lightText : GreenTheme.colors.text,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
  },
  warning: {
    backgroundColor: GreenTheme.colors.secondary,
    padding: 10,
    marginTop: 40,
    borderColor: GreenTheme.colors.warning,
    borderWidth: 2,
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  warningError: {
    backgroundColor: GreenTheme.colors.error,
    borderColor: GreenTheme.colors.text,
    color: GreenTheme.colors.lightText,
  },
});

export default Alert;
