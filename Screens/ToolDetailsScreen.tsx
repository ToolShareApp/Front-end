import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useRoute } from '@react-navigation/native'
import { GreenTheme } from "../Themes/GreenTheme";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ToolDetailsScreen: React.FC = () => {
  const { api } = useContext(GlobalStateContext);
  const [toolDetails, setToolDetails] = useState<object>();
  const [ownerDetails, setOwnerDetails] = useState<object>()
  const route = useRoute();

  function getToolByToolId(listing_id: number) {
    return api.get(`/listing/${listing_id}`).then((apiResponse) => {
      const {
        data: { data }
      } = apiResponse;
      const currentTool = data[0]
      return currentTool;
    });
  }

  function getOwnerDetails(profile_id: number) {
    return api.get(`/profile/${profile_id}`)
    .then((apiResponse) => {
      const { data: { data } } = apiResponse
      const ownerDetails = data[0]
      return ownerDetails
    })
  }

  const image_url: string = toolDetails?.photo_url
  const toolName: string = toolDetails?.tool
  const description: string = toolDetails?.description
  const profile_id: number = toolDetails?.owner_id

  useEffect(() => {
    (async () => {
      const { listing_id } = route.params;
      const toolDetails = await getToolByToolId(listing_id)
      setToolDetails(toolDetails);
      const ownerDetails = await getOwnerDetails(profile_id)
      setOwnerDetails(ownerDetails)
    })()
  }, [route.params, profile_id]);

  const picture_url: string = ownerDetails?.picture_url
  const ownerName: string = ownerDetails?.display_name

  return (
    <View style={styles.toolDetails}>
      <Text variant="headlineMedium">{toolName}</Text>
      <Image source={{
          uri: image_url
        }} style={styles.image}
        />
        <View style={styles.description}>
      <Text variant="bodyMedium">{description}</Text>
        </View>
      <Card style={styles.ownerCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardText}>
          <Text variant="bodyMedium">Owner:</Text>
          <Text variant="bodyMedium">{ownerName}</Text>
          </View>
          <Avatar.Image source={{
          uri: picture_url
        }} style={styles.ownerAvatar}/>
        </Card.Content>
      </Card>
      <Icon name="chat" size={40} color="green" style={styles.chatIcon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  toolDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    height: 225,
    borderRadius: 20
  },
  description: {
    width: "95%",
    textAlign: 'center',
  },
  ownerCard: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    backgroundColor: GreenTheme.colors.surface
  },
  cardContent: {
    flexDirection: "row",
  },
  cardText: {
    flex: 1,
    color: GreenTheme.colors.text,
  },
  ownerAvatar: {
    marginLeft: 10,
  },
  chatIcon: {
    marginRight: 30,
    textAlign: "center"
  }
});

export default ToolDetailsScreen;
