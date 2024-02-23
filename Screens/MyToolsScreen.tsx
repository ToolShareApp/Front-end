import React from "react";
import { View } from "react-native";
import MyToolsList from "../Components/MyToolsList";

interface MyToolsScreenProps {}

const MyToolsScreen: React.FC<MyToolsScreenProps> = () => {
  return (
    <View>
      <MyToolsList />
    </View>
  );
};

export default MyToolsScreen;
