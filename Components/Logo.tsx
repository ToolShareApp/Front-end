import React from "react";
import { Image } from "expo-image";

interface LogoProps {
  size?: number;
}
const Logo: React.FC<LogoProps> = ({ size = 100 }) => {
  return (
    <Image
      style={{
        width: size,
        height: size,
        margin: 20,
      }}
      source="https://avatars.githubusercontent.com/u/160129761?s=400&u=4c9cc24f8547b04bceaec205127090d57974804d&v=4"
      placeholder="ToolShareApp"
      contentFit="cover"
      transition={1000}
    />
  );
};

export default Logo;
