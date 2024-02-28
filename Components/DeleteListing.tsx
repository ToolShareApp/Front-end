import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { StyleSheet, View } from "react-native";
import { Button, Portal, Dialog, Text } from "react-native-paper";
import { GreenTheme } from "../Themes/GreenTheme";

interface DeleteListingProps {
  listing: object;
  listing_id: number;
  setTools?: any;
  setDeleteSuccess: any;
  setDeleteError: any;
}

const DeleteListing: React.FC<DeleteListingProps> = ({
  listing,
  listing_id,
  setTools,
  setDeleteSuccess,
  setDeleteError,
}) => {
  const { api } = useContext(GlobalStateContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  const deleteListing = (listing_id) => {
    return api.delete(`/listing/${listing_id}`);
  };

  const currentRouteName: string = route.name;

  useEffect(() => {
    (async () => {
      try {
        if (confirmDelete) {
          if (currentRouteName === "ToolsList") {
            setTools((prevTools: object[]) =>
              prevTools.filter((currentTool: object) => currentTool !== listing)
            );
            setDeleteSuccess(true);
            await deleteListing(listing_id);
          }
          if (currentRouteName === "ToolDetailsScreen") {
            setDeleteSuccess(true);
            // @ts-ignore
            navigation.navigate("MyTools", {
              screen: "ToolsList",
            });
            await deleteListing(listing_id);
          }
        }
      } catch (error: any) {
        setTools((prevTools: object[]) => [...prevTools, listing])
        setDeleteError(true);
        console.error("Error deleting tool:", error);
      }
    })();
  }, [confirmDelete]);

  const clickDelete = () => {
    setOpenDialog(true);
  };

  return (
    <View>
      <Button icon="delete" onPress={clickDelete} style={styles.deleteButton}>
        Delete
      </Button>
      {openDialog ? (
        <Portal>
          <Dialog
            visible={openDialog}
            onDismiss={() => setOpenDialog(false)}
            theme={{ colors: { backdrop: "transparent" } }}
            style={styles.dialog}
          >
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure you want to delete this listing?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirmDelete(true)}>Confirm</Button>
              <Button onPress={() => setOpenDialog(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
    justifyContent: "center",
  },
  dialog: {
    backgroundColor: GreenTheme.colors.surface,
  },
});

export default DeleteListing;
