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

async function findPlace(place: string) {

	let userPlace: any = await axios
		.get(
			`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&key=${YOUR_API_KEY}`
			
	)
	return userPlace
}

async function getUsers() {

	let users: any = await axios
		.get(
			`https://nc-toolshare.onrender.com/api/profile`
			
	)
	return users.data.data
}

async function getListingById(owner_id: number) {
	let listing: any = await axios
		.get(
			`https://nc-toolshare.onrender.com/api/listing/owner/${owner_id}`
			
	)
	return listing.data.data
}

async function getListings() {
	let listings: any = await axios
		.get(
			`https://nc-toolshare.onrender.com/api/listing`
			
	)
	return listings.data.data
}

export default {reverseGeocode, findAddress, findPlace, getUsers, getListingById, getListings}
