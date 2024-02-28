import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { GreenTheme } from '../Themes/GreenTheme'

interface LoaderProps {
  visible: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ visible, message }) => {
  return (
    visible && (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={GreenTheme.colors.primary} size="large" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginTop: 20,
    color: GreenTheme.colors.primary,
  },
});

export default Loader;
