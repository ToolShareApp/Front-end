import React from "react";
import { Text } from "react-native-paper";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Text>{title}</Text>;
};
