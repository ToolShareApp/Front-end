import { DefaultTheme } from 'react-native-paper';

export const GreenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Main green color, used as the primary color in the theme
    accent: '#8BC34A', // Lighter green color for accents
    background: '#FFFFFF', // Background color for general app background
    surface: '#E8F5E9', // Surface color for elements like cards and menus
    text: '#212121', // Main text color, offering high contrast on light backgrounds
    disabled: '#BDBDBD', // Color for disabled elements, ensuring they are distinguishable
    placeholder: '#9E9E9E', // Placeholder text color, less prominent than active text
    backdrop: '#607D8B', // Backdrop color for modal windows, providing sufficient contrast
    onSurface: '#000000', // Color for text and icons on surface elements, ensuring legibility
    error: '#D32F2F', // Error color for form validations and alerts
    warning: '#FFA000', // Warning color for cautionary information
    success: '#4CAF50', // Success color, can use the same green or a variation for positive feedback
    info: '#1976D2', // Info color for informational messages or statuses
    secondary: '#FFC107', // Secondary color for contrasting accents or elements
    secondaryText: '#757575', // Secondary text color for subtitles or secondary information
    lightBackground: '#F5F5F5', // Light background for sections or selected states
    darkText: '#212121', // Dark text color for use on light backgrounds for high readability
    lightText: '#FFFFFF', // Light text color for use on dark backgrounds or elements
  },
};
