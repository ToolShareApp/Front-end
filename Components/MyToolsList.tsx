import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import ToolCard from "./ToolCard";
import { ScrollView } from "react-native-gesture-handler";
import { GreenTheme } from "../Themes/GreenTheme";

const MyToolsList: React.FC = () => {
  const { api, user } = useContext(GlobalStateContext);
  const [toolsList, setToolsList] = useState<object[]>();

  function getToolsByOwnerId() {
    const profile_id = user?.profile_id;
    return api.get(`/listing/owner/${profile_id}`).then((apiResponse: any) => {
      const {
        data: { data },
      } = apiResponse;
      return data;
    });
  }

  useEffect(() => {
    getToolsByOwnerId().then((response: any) => {
      setToolsList(response);
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: GreenTheme.colors.surface }}>
      {toolsList?.map((listing: object) => {
        return (
          <ToolCard
            key={listing.listing_id}
            listing_id={listing.listing_id}
            category={listing.category}
            name={listing.tool}
            subcategory={listing.subcategory}
            photo={listing.photo_url}
            description={listing.description}
          />
        );
      })}
    </ScrollView>
  );
};

export default MyToolsList;
