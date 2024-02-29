import { LogBox, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./Components/AppNavigator";
import { registerRootComponent } from "expo";
import GlobalState from "./Contexts/GlobalState";
import { GreenTheme } from "./Themes/GreenTheme";
LogBox.ignoreAllLogs();

const App: React.FC = () => {
	StatusBar.setTranslucent(true);
	StatusBar.setBackgroundColor("transparent");

	return (
		<GlobalState apiUrl={"https://nc-toolshare.onrender.com/api/"}>
			<PaperProvider theme={GreenTheme}>
				<NavigationContainer>
					<DrawerNavigator />
				</NavigationContainer>
			</PaperProvider>
		</GlobalState>
	);
};

export default App;

registerRootComponent(App);
function setErrorMsg(arg0: string) {
	throw new Error("Function not implemented.");
}
