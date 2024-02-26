import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, TouchableRipple, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GreenTheme } from "../Themes/GreenTheme";

interface MyToolCardProps {
  category: string;
  subcategory: string;
  name: string;
  photo: string;
  listing_id: number;
}

const MyToolCard: React.FC<MyToolCardProps> = ({
  category,
  photo,
  subcategory,
  name,
  listing_id,
}) => {
  const navigation: any = useNavigation();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate("MyTools", {
          screen: "ToolDetailsScreen",
          params: { listing_id: listing_id },
        })
      }
    >
      <Card style={styles.card}>
        <Card.Content style={styles.container}>
          <View style={styles.text}>
            <Text variant="titleMedium">{name}</Text>
            <Text variant="bodyMedium">{category}</Text>
            <Text variant="bodyMedium">{subcategory}</Text>
          </View>
          <View style={styles.image}>
            {photo && <Avatar.Image source={{ uri: photo }} />}
          </View>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
  image: {
    marginLeft: 10,
  },
  card: {
    margin: 10,
    backgroundColor: GreenTheme.colors.surface,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GreenTheme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: GreenTheme.colors.secondaryText,
  },
});

export default MyToolCard;
