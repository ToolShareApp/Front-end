import React from "react";
import { Image } from "expo-image";

const icon = require(".././assets/icon.png");
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
      source={icon}
      placeholder="ToolShareApp"
      contentFit="cover"
      transition={1000}
    />
  );
};

export default Logo;
