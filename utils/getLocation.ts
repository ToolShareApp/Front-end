import * as Location from "expo-location";

export default async function getLocation() {
    
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return "Permission to access location was denied"
			}
			//if permission is denied. alert to ask to change. send user to settings

			let location: any = await Location.getCurrentPositionAsync({});

            return location
}
    