import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from "./Components/AppNavigator";
import { registerRootComponent } from 'expo';
import GlobalState from './Contexts/GlobalState';
import { GreenTheme } from './Themes/GreenTheme'

const App:React.FC = () => {
  return (
    <GlobalState apiUrl={'https://nc-toolshare.onrender.com/api/'}>
    <PaperProvider theme={GreenTheme}>
    <NavigationContainer>
    <DrawerNavigator />
    </NavigationContainer>
    </PaperProvider>
    </GlobalState>
  );
}

export default App;

registerRootComponent(App);

