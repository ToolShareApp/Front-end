import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, label }) => {
  return (
    <PaperButton mode="contained" onPress={onPress}>
      {label}
    </PaperButton>
  );
};

export default Button;