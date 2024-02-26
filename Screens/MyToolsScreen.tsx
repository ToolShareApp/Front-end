import React from "react";
import { View } from "react-native";
import MyToolsList from "../Components/MyToolsList";
import { ScrollView } from "react-native-gesture-handler";

interface MyToolsScreenProps {}

const MyToolsScreen: React.FC<MyToolsScreenProps> = () => {
  return (
    <ScrollView>
      <MyToolsList />
    </ScrollView>
  );
};

export default MyToolsScreen;
