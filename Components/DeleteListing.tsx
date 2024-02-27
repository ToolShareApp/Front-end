import React, { useState, useContext, useEffect } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { StyleSheet, View } from "react-native";
import { Button, Portal, Dialog, Text, Snackbar } from "react-native-paper";
import { GreenTheme } from "../Themes/GreenTheme";
import Alert from "./Alert";

interface DeleteListingProps {
  listing: object;
  listing_id: number;
  setTools: any;
}

const DeleteListing: React.FC<DeleteListingProps> = ({
  listing,
  listing_id,
  setTools,
}) => {
  const { api } = useContext(GlobalStateContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [successVisible, setSuccessVisible] = useState<boolean>(false)

  const deleteListing = (listing_id) => {
    return api.delete(`/listing/${listing_id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        if (confirmDelete) {
            setTools((prevTools: object[]) =>
            prevTools.filter((currentTool: object) => currentTool !== listing)
            );
        setSuccessVisible(true)
        await deleteListing(listing_id);
        }
      } catch (error) {
        setTools((prevTools: object[]) => [...prevTools, listing]);
        setError(error);
        console.error("Error deleting tool:", error);
      }
    })();
  }, [confirmDelete]);

  const clickDelete = () => {
    setOpenDialog(true);
  };

  return (
    <View>
        <Snackbar visible={successVisible} onDismiss={() => setSuccessVisible(false)} action={{
          label: 'Close',
          onPress: () => {
            setSuccessVisible(false)
          }
        }}>
        Your listing has been succesfully deleted!
        </Snackbar>
      {error ? (
        <Alert
          text={
            "Sorry, we cannot delete your listing at this time. Please try again later."
          }
        />
      ) : null}
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
