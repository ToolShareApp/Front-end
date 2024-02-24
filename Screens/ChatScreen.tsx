import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Card, Avatar, Paragraph } from 'react-native-paper';
import GlobalStateContext from '../Contexts/GlobalStateContext'
import GlobalState from '../Contexts/GlobalState'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Message {
  id: number;
  username: string;
  userId: number; 
  userAvatar: string | null;
  text: string;
  date: string;
}

const ChatScreen = () => {
  const { user } = useContext(GlobalStateContext)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'Cristina',
      userId: 2,
      userAvatar: null,
      text: 'I\'d like to borrow this tool',
      date: 'Today, 5:00 PM',
    }
  ]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text) {
      const newMessage: Message = {
        id: messages.length + 1,
        userId: user.profile_id,
        text: text,
        date: new Date().toLocaleTimeString(),
        userAvatar: '',
        username: user.display_name,
      };
      setMessages([...messages, newMessage]);
      setText('');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={80}
    >
      <View style={styles.container}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.message,
            message.userId === user.profile_id ? styles.messageRight : styles.messageLeft,
          ]}>
            {message.userId !== user.profile_id && (
              message.userAvatar && message.userAvatar !== '' ? (
                <Avatar.Image size={46} source={{
                  uri: message.userAvatar,
                }} />
                ) : (
                <Avatar.Text size={46} label={message.username.substring(0,2)} style={styles.avatar} />
              )
            )}
            <Card style={styles.card} elevation={0}>
              <Card.Content
                style={[
                  styles.cartContent,
                  message.userId === user.profile_id ? styles.cardMessageRight : styles.cardMessageLeft,
                  ]}
              >
                <Paragraph style={styles.username}>{message.username}</Paragraph>
                <Paragraph>{message.text}</Paragraph>
                <Paragraph style={styles.dateText}>{message.date}</Paragraph>
              </Card.Content>
            </Card>
            {message.userId === user.profile_id && (
              user.picture_url && user.picture_url !== '' ? (
                  <Avatar.Image size={46} source={{
                    uri: user.picture_url,
                  }} />
                ) : (
                <Avatar.Text size={46} label={user.display_name.substring(0,2)} style={styles.avatar} />
                )
            )}
          </View>
        ))}
      </View>
      <TextInput
        label="Type a message..."
        value={text}
        multiline
        onChangeText={text => setText(text)}
        style={styles.input}
        right={<TextInput.Icon name="send" onPress={sendMessage}  icon={'send'}/>}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 40,
  },
  message: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  messageRight: {
    justifyContent: 'flex-end',
  },
  messageLeft: {
    justifyContent: 'flex-start',
  },
  card: {
    padding: 6,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  cartContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    minWidth: 100,
    maxWidth: '92%',
    padding: 0,
    Margin: 0,
  },
  cardMessageRight: {
    borderBottomRightRadius: 0,
    alignItems: 'flex-end',
  },
  cardMessageLeft: {
    borderBottomLeftRadius: 0,
  },
  username:{
    fontWeight: 'bold',
  },
  avatar: {
    marginHorizontal: 4,
  },
  dateText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default ChatScreen;
