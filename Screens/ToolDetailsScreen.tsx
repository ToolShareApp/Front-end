import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Avatar,
  Card,
  Text,
  Chip,
  TouchableRipple,
  Snackbar
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GreenTheme } from "../Themes/GreenTheme";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

const ToolDetailsScreen: React.FC = () => {
  const { api, user } = useContext(GlobalStateContext);
  const [toolDetails, setToolDetails] = useState<object>();
  const [ownerDetails, setOwnerDetails] = useState<object>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);
  const [interested, setInterested] = useState<boolean>();
  const [toast, setToast] = useState<boolean>(false);

  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { listing_id } = route.params;

  const onToggleSnackBar = () => setToast(!toast);

  const onDismissSnackBar = () => setToast(false);

  function getToolByToolId(listing_id: number) {
    return api.get(`/listing/${listing_id}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const currentTool = data[0];
      return currentTool;
    });
  }

  function getOwnerDetails(profile_id: number) {
    return api.get(`/profile/${profile_id}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const ownerDetails = data[0];
      return ownerDetails;
    });
  }

  function postInterest(listing_id: number, currentUser_id: number) {
    return api.post('/interest', {
      listingId: listing_id,
      userId: currentUser_id,
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function deleteInterest(listing_id: number, currentUser_id: number) {
    return api.delete('/interest', {
      data: {
        listingId: listing_id,
        userId: currentUser_id,
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getInterestedByUserID(currentUser_id: number, listing_id: number) {
    return api.get(`/interest/lendee/${currentUser_id}`)
    .then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const userInterested: boolean = data.some((tool: object) => {
        return listing_id === tool?.listing_id
      })
      return userInterested
    })
  }
  

  useEffect(() => {
    (async () => {
      const toolDetails = await getToolByToolId(listing_id);
      setToolDetails(toolDetails);
      setIsLoading(false);
      const profile_id: number = toolDetails?.owner_id;
      const ownerDetails = await getOwnerDetails(profile_id);
      setOwnerDetails(ownerDetails);
      const userInterested = await getInterestedByUserID(user.profile_id, listing_id)
      setInterested(userInterested)
    })();
  }, []);

  const createNewChat = () => {
    return api.post('/chat/', {
      listingId: listing_id,
      userId: toolDetails?.owner_id
    })
  }
  
  function startChat() {
    const owner_id: number = toolDetails?.owner_id;
    createNewChat().then((response) => {
      if(response?.data?.recordId){
        const recordId = response?.data?.recordId;
        // @ts-ignore
        navigation.navigate('Messages', {
          screen: "ChatScreen",
          params: {  user_id: owner_id, title: ownerName, tool_name: toolName, listing_id, recordId }
        })
      }
    }).catch((error) => {
      setToast(true)
      console.error(error)
    })

  }

 async function addToInterested() {
  try {
    setInterested(true)
    // @ts-ignore
    await postInterest(listing_id, user.profile_id)
  } catch (err) {
    console.log(err)
  }
  }

  async function removeFromInterested() {
    try {
      setInterested(false)
      // @ts-ignore
      await deleteInterest(listing_id, user.profile_id)
    } catch (err) {
      console.log(err)
    }
  }

  const image_url: string = toolDetails?.photo_url;
  const toolName: string = toolDetails?.tool;
  const description: string = toolDetails?.description;
  const category: string = toolDetails?.category;
  const subcategory: string = toolDetails?.subcategory;
  const depositRequired: boolean = toolDetails?.deposit_required;
  const depositAmount: number = toolDetails?.deposit_amount;
  const profilePicture_url: string = ownerDetails?.picture_url;
  const ownerName: string = ownerDetails?.display_name;

  return (
    <ScrollView>
      <View style={styles.toolDetails}>
        {isLoading ? (
          <Text variant="bodyMedium">Loading tool...</Text>
        ) : (
          <>
            <Text variant="headlineMedium">{toolName}</Text>
            { image_url && (
              <Image
                source={{
                  uri: image_url,
                }}
                style={styles.image}
              />
            )}
            <View style={styles.category}>
              <Chip icon="toolbox" style={styles.chip}>
                {category}
              </Chip>
              <Chip icon="toolbox" style={styles.chip}>
                {subcategory}
              </Chip>
            </View>
            { description !== '' ?
            <View style={styles.about}>
              <TouchableRipple
                onPress={() => {
                  setDescriptionOpen(!descriptionOpen);
                }}
              >
                <View style={styles.about}>
                  <Icon name="info-outline" size={20} />
                  <Text variant="titleMedium" style={styles.aboutTitle}>
                    Learn more about this tool
                  </Text>
                  <Icon name="expand-more" size={30} color="black" />
                </View>
              </TouchableRipple>
            </View>
            : null}
            {descriptionOpen ? (
              <Text variant="bodyMedium" style={styles.description}>
                {description}
              </Text>
            ) : null}
            <View>
              <View style={styles.deposit}>
                {depositRequired ? (
                  <>
                    <Text style={styles.depositRequired}>Deposit required</Text>
                    <Icon name="check" size={30} color="green" />
                  </>
                ) : (
                  <>
                    <Text style={styles.depositRequired}>
                      No deposit required
                    </Text>
                    <Icon name="cancel" size={30} color="green" />
                  </>
                )}
              </View>
              {depositRequired ? (
                <Text>Deposit amount: £{depositAmount}</Text>
              ) : null}
            </View>
            <Card style={styles.ownerCard}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text variant="bodyLarge">Lender: </Text>
                  <Text variant="bodyLarge">{ownerName}</Text>
                </View>

                {profilePicture_url ? (
                    <Avatar.Image
                      source={{
                        uri: profilePicture_url,
                      }}
                      style={styles.ownerAvatar}
                    />
                  ) : (
                    <Avatar.Text
                      label={ownerName?.substring(0, 1)}
                      style={styles.ownerAvatar}
                    />
                  )}
              </Card.Content>
            </Card>
            <Button
              style={styles.location}
              icon={() => <Icon name="location-pin" size={30} color="green" />}
            >
              {" "}
              Get location
            </Button>
            <View style={styles.buttons}>
              { !interested ?
              <Button icon="star" mode="contained" style={styles.button} onPress={() => addToInterested()}>
                Add to Interested
              </Button>
              :  
              <Button icon="star" mode="contained" style={styles.button} onPress={() => removeFromInterested()}>
              Remove from Interested
            </Button>
              }
              <Button icon="chat" mode="contained" style={styles.button} onPress={() => startChat()}>
                Start Chat
              </Button>
            </View>
            <Snackbar
              visible={toast}
              onDismiss={onDismissSnackBar}
            >
              Error!
            </Snackbar>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toolDetails: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    height: 225,
    borderRadius: 20,
  },
  category: {
    flexDirection: "row",
    marginBottom: 20,
  },
  chip: {
    marginRight: 10,
    backgroundColor: GreenTheme.colors.surface,
  },
  about: {
    marginBottom: 10,
    flexDirection: "row",
  },
  aboutTitle: {
    marginLeft: 5,
  },
  description: {
    width: "95%",
    textAlign: "center",
    marginBottom: 20,
  },
  deposit: {
    flexDirection: "row",
    alignItems: "center",
  },
  depositRequired: {
    marginRight: 8,
  },
  location: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
  },
  ownerCard: {
    marginTop: 20,
    marginBottom: 15,
    width: "95%",
    backgroundColor: GreenTheme.colors.surface,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flexDirection: "row",
    color: GreenTheme.colors.darkText,
  },
  ownerAvatar: {
    marginLeft: 30,
  },
  chatIcon: {
    marginRight: 30,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    margin: 15,
  },
});

export default ToolDetailsScreen;
