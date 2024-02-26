import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { Button } from "react-native-paper";
import { GreenTheme } from "../Themes/GreenTheme";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyToolCard from "./MyToolCard";

const MyToolsList: React.FC = () => {
  const { api, user } = useContext(GlobalStateContext);
  const [toolsList, setToolsList] = useState<object[]>();
  const navigation: any = useNavigation();

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
      <View>
        <View style={styles.buttonContainer}>
      <Button icon="plus" mode="outlined" style={styles.button} onPress={() => navigation.navigate('MyTools', {
        screen: 'AddListingScreen'
      })
    }
      >Add a listing</Button>
        </View>
      {toolsList?.map((listing: object) => {
        return (
          <MyToolCard
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
          </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
    width: "40%",
    margin: 15,
  }
})

export default MyToolsList;
