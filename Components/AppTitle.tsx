import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Logo from "./Logo";

const AppTitle: React.FC = () => {
  return (
    <View style={{ padding: 30 }}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.tool]}>Tool</Text>
        <Text style={[styles.text, styles.share]}>Share</Text>
        <Text style={[styles.text, styles.app]}>App</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.tagline}>Unlock Skills, Lend Tools</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -10,
  },
  text: {
    fontSize: 44,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.65)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  tool: {
    color: "#8BC34A",
    paddingLeft: 15,
    paddingRight: 20,
  },
  share: {
    color: "#4CAF50",
    paddingRight: 20,
    marginLeft: -30,
  },
  app: {
    color: "#FFFFFF",
    paddingRight: 20,
    marginLeft: -30,
  },
  tagline: {
    fontSize: 20,
  },
});

export default AppTitle;
