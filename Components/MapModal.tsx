import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FAB, IconButton, Modal, Portal } from 'react-native-paper'
import { GreenTheme } from '../Themes/GreenTheme'
import Map from "../Components/Map";

const MapModal: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <FAB
        style={styles.fab}
        icon="map"
        onPress={showModal}
        color={GreenTheme.colors.warning}
      />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <IconButton
            icon="close"
            size={20}
            onPress={hideModal}
            style={styles.closeButton}
          />
          <Map />
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 40,
    backgroundColor: GreenTheme.colors.primary,
    zIndex: 10,
    color: GreenTheme.colors.warning,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    height: Dimensions.get('window').height * 0.8,
    borderRadius: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    right: -22,
    top: -22,
    margin: 10,
    zIndex: 100000,
    backgroundColor: GreenTheme.colors.error,
  },
});

export default MapModal;
