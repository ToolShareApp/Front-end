import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Components/AppNavigator';

const App:React.FC = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

