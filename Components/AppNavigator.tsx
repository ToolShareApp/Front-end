import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import BrowseToolsScreen from '../Screens/BrowseToolsScreen';
import MyToolsScreen from '../Screens/MyToolsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MessagesScreen from '../Screens/MessagesScreen';


const Drawer = createDrawerNavigator()

const AppNavigator:React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="BrowseTools" component={BrowseToolsScreen} options={{ title: '🔍 Browse Tools' }}/>
        <Drawer.Screen name="MyTools" component={MyToolsScreen} options={{ title: '🛠️ My Tools' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: '👤 Profile' }}/>
        <Drawer.Screen name="Messages" component={MessagesScreen} options={{ title: '💬 Messages' }}/>
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;
