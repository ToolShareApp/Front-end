import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./Components/AppNavigator";
import { registerRootComponent } from "expo";
import GlobalState from "./Contexts/GlobalState";
import { GreenTheme } from "./Themes/GreenTheme";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

interface LocationProps {
	deviceLocation: any;
}

const App: React.FC<LocationProps> = (props: LocationProps) => {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	console.log(props.deviceLocation);
	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<GlobalState apiUrl={"https://nc-toolshare.onrender.com/api/"}>
			<PaperProvider theme={GreenTheme}>
				<NavigationContainer>
					<DrawerNavigator {...(props.deviceLocation = location)} />
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
