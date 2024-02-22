import React from 'react'
import { Image } from 'expo-image';

const Logo:React.FC = () => {
  return (
    <Image
      style={{
        width: 100,
        height: 100,
        margin: 20,
      }}
      source="https://avatars.githubusercontent.com/u/160129761?s=400&u=80309e13c4309ae94982b9b646b7c496bfb320cb&v=4"
      placeholder='ToolShareApp'
      contentFit="cover"
      transition={1000}
    />
  );
}


export default Logo;