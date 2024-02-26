import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  Dimensions
} from "react-native";
import { TextInput, Avatar, Paragraph } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { GreenTheme } from "../Themes/GreenTheme";
import { useRoute } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width;
const maxMessageWidth = screenWidth * 0.8;
interface Message {
  id: number;
  username: string;
  userId: number;
  userAvatar: string | null;
  text: string;
  date: string;
}

const ChatScreen: React.FC = () => {
  const { user } = useContext(GlobalStateContext);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "Cristina",
      userId: 2,
      userAvatar: null,
      text: "Hey there! I was wondering if I could borrow a lawn mower for the weekend. Do you have one available?",
      date: "Today, 5:00 PM",
    },
    {
      id: 2,
      username: "Olivia",
      userId: 1,
      userAvatar: null,
      text: "Hi Christina! Yes, I do have a lawn mower you can borrow. I’ll go ahead and arrange the deal for you right now, and don't worry, it’ll be free of charge.",
      date: "Today, 5:00 PM",
    },
    {
      id: 3,
      username: "Cristina",
      userId: 2,
      userAvatar: null,
      text: "That's amazing, thank you so much! How do I go about picking it up?",
      date: "Today, 5:00 PM",
    },
    {
      id: 4,
      username: "Olivia",
      userId: 1,
      userAvatar: null,
      text: "You're welcome! Just let me know a convenient time for you, and I'll make sure it's ready for pick up. We can finalize the details through our ToolShare app.",
      date: "Today, 5:00 PM",
    },
    {
      id: 5,
      username: "Cristina",
      userId: 2,
      userAvatar: null,
      text: "Sounds perfect. I'll send you a message in the app with the time. Thanks again!",
      date: "Today, 5:00 PM",
    },
    {
      id: 6,
      username: "Olivia",
      userId: 1,
      userAvatar: null,
      text: "No problem at all, happy to help. See you soon!",
      date: "Today, 5:00 PM",
    },
  ]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>();
  const route = useRoute();
  const { user_id } = route.params;

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    console.log('route.params')
    console.log(route.params)
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
                <Avatar.Image size={46} source={{ uri: item.userAvatar }} style={styles.avatar} />
              ) : (
                <Avatar.Text size={46} label={item.username.substring(0, 1)} style={styles.avatar} />
              ))}
            <View style={styles.messageContainer}>
              <View
                style={[
                  styles.messageBody,
                  item.userId === user.profile_id
                    ? styles.alightMessageRight
                    : styles.alightMessageLeft,
                ]}
              >
                <Paragraph style={styles.username}>{item.username}</Paragraph>
                <Paragraph>{item.text}</Paragraph>
                <Paragraph style={styles.dateText}>{item.date}</Paragraph>
              </View>
            </View>
            {item.userId === user.profile_id &&
              (user.picture_url ? (
                <Avatar.Image size={46} source={{ uri: user.picture_url }} style={styles.avatar} />
              ) : (
                <Avatar.Text
                  size={46}
                  label={user.display_name.substring(0, 1)}
                  style={styles.avatar}
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
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Shadows for Android
    elevation: 4,
  },
  message: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  messageRight: {
    justifyContent: "flex-end",
    paddingVertical: 20,
    maxWidth: '100%',
    marginEnd: 20,
  },
  messageLeft: {
    justifyContent: "flex-start",
    marginStart: 20,
  },
  messageContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 8,
  },
  messageBody: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 15,
    maxWidth: maxMessageWidth,
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Shadows for Android
    elevation: 4,
  },
  alightMessageRight: {
    borderBottomRightRadius: 0,
    alignItems: "flex-end",
    backgroundColor: GreenTheme.colors.lightEcoBackground,
  },
  alightMessageLeft: {
    borderBottomLeftRadius: 0,
    alignItems: "flex-start",
    backgroundColor: GreenTheme.colors.background,
  },
  username: {
    fontWeight: "bold",
  },
  avatar: {
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Shadows for Android
    elevation: 4,
  },
  dateText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },
});

export default ChatScreen;
