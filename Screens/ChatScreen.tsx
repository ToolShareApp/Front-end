import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { TextInput, Card, Avatar, Paragraph } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { GreenTheme } from "../Themes/GreenTheme";

interface Message {
  id: number;
  username: string;
  userId: number;
  userAvatar: string | null;
  text: string;
  date: string;
}

const ChatScreen = () => {
  const { user } = useContext(GlobalStateContext);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "Cristina",
      userId: 2,
      userAvatar: null,
      text: "I'd like to borrow this tool",
      date: "Today, 5:00 PM",
    },
  ]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (text) {
      const newMessage: Message = {
        id: messages.length + 1,
        userId: user.profile_id,
        text: text,
        date: new Date().toLocaleTimeString(),
        userAvatar: "",
        username: user.display_name,
      };
      setMessages([...messages, newMessage]);
      setText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 136 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.userId === user.profile_id
                ? styles.messageRight
                : styles.messageLeft,
            ]}
          >
            {item.userId !== user.profile_id &&
              (item.userAvatar ? (
                <Avatar.Image size={46} source={{ uri: item.userAvatar }} />
              ) : (
                <Avatar.Text size={46} label={item.username.substring(0, 2)} />
              ))}
            <Card style={styles.card}>
              <Card.Content
                style={[
                  styles.cartContent,
                  item.userId === user.profile_id
                    ? styles.cardMessageRight
                    : styles.cardMessageLeft,
                ]}
              >
                <Paragraph style={styles.username}>{item.username}</Paragraph>
                <Paragraph>{item.text}</Paragraph>
                <Paragraph style={styles.dateText}>{item.date}</Paragraph>
              </Card.Content>
            </Card>
            {item.userId === user.profile_id &&
              (user.picture_url ? (
                <Avatar.Image size={46} source={{ uri: user.picture_url }} />
              ) : (
                <Avatar.Text
                  size={46}
                  label={user.display_name.substring(0, 2)}
                />
              ))}
          </View>
        )}
      />
      <TextInput
        label="Type a message..."
        value={text}
        multiline
        onChangeText={(text) => setText(text)}
        style={styles.input}
        right={
          <TextInput.Icon name="send" onPress={sendMessage} icon={"send"} />
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 0,
    minHeight: 80,
    backgroundColor: GreenTheme.colors.lightEcoBackground,
  },
  message: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  messageRight: {
    justifyContent: "flex-end",
  },
  messageLeft: {
    justifyContent: "flex-start",
  },
  card: {
    padding: 6,
    elevation: 0,
    backgroundColor: "transparent",
  },
  cartContent: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "auto",
    minWidth: 120,
    maxWidth: "92%",
    padding: 0,
    Margin: 0,
  },
  cardMessageRight: {
    borderBottomRightRadius: 0,
    alignItems: "flex-end",
  },
  cardMessageLeft: {
    borderBottomLeftRadius: 0,
  },
  username: {
    fontWeight: "bold",
  },
  avatar: {
    marginHorizontal: 4,
  },
  dateText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },
});

export default ChatScreen;
