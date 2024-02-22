import { DefaultTheme } from 'react-native-paper';

export const GreenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Main green color, used as the primary color in the theme
    accent: '#8BC34A', // Additional green color for accents
    background: '#FFFFFF', // Background color
    surface: '#E8F5E9', // Surface color (for cards, menus, etc.)
    text: '#212121', // Main text color
    disabled: '#BDBDBD', // Color for disabled elements
    placeholder: '#9E9E9E', // Text color for input placeholders
    backdrop: '#607D8B', // Background color for modal windows
    onSurface: '#000000', // Color for text and icons on surfaces
  },
};

export const GreenDrawerTheme = {
  primary: '#007bff', // Primary color for your theme
  secondary: '#6c757d', // Secondary color for your theme
  background: '#ffffff', // Background color
  text: '#343a40', // Text color
  activeTintColor: '#007bff', // Color for the active item
  inactiveTintColor: '#6c757d', // Color for the inactive item
};
