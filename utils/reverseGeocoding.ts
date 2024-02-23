import axios from "axios";
import { YOUR_API_KEY } from "../API_KEY";

async function reverseGeocode(lat: string, lng: string) {

	let place: any = await axios
		.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${YOUR_API_KEY}`
	)
	return place
}


async function findAddress(address: string) {

	let userAddress: any = await axios
		.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${YOUR_API_KEY}`
	)
	return userAddress
}

export default {reverseGeocode, findAddress}