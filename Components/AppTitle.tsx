import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const AppTitle:React.FC = ( ) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.tool]}>Tool</Text>
      <Text style={[styles.text, styles.share]}>Share</Text>
      <Text style={[styles.text, styles.app]}>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 30,
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  tool: {
    color: '#4CAF50',
    paddingLeft: 15,
  },
  share: {
    color: '#8BC34A',
  },
  app: {
    color: '#FFFFFF',
    paddingRight: 15,
  },
});

export default AppTitle;