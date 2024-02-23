import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import ToolCard from "./ToolCard";
import { ScrollView } from "react-native-gesture-handler";
import { GreenTheme } from "../Themes/GreenTheme";

export default function ToolsList() {
	const { api } = useContext(GlobalStateContext);
	const [listings, setListings] = useState<object[]>([]);

	function getListings() {
		return api.get(`/listing/`).then((apiResponse: any) => {
			const {
				data: { data },
			} = apiResponse;
			return data;
		});
	}

	useEffect(() => {
		getListings().then((response: any) => {
			setListings(response);
		});
	}, []);

	return (
		<ScrollView style={{ backgroundColor: GreenTheme.colors.surface }}>
			{listings?.map((listing: object) => {
				return (
					<ToolCard
						key={listing.listing_id}
						listing_id={listing.listing_id}
						category={listing.category}
						name={listing.tool}
						subcategory={listing.subcategory}
						photo={listing.photo_url}
					/>
				);
			})}
		</ScrollView>
	);
}
