import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import GlobalStateContext from '../Contexts/GlobalStateContext'
import Loader from '../Components/Loader'

interface Chat {
  chat_id: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageDate: string;
  chatCreatedByUserId: string;
}

const ChatsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, api } = useContext(GlobalStateContext);
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useFocusEffect(
    React.useCallback(() => {

      getChatsByUserUd();

      return () => {
        setChats([])
      };
    }, []),
  );


  const getChatsByUserUd = async () => {
    try {
      const response = await api.get(`/chat/user/${user.profile_id}`);
      console.log(response.data.data)
      setChats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        getChatsByUserUd()
      }, 10000)
    }
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", { chatId: item.chat_id, title: item.otherUserName })
      }
    >
      <List.Item
        title={item.otherUserName}
        description={item?.lastMessage}
        descriptionNumberOfLines={1}
        left={() => (
          <Avatar.Text
            style={styles.avatar}
            size={46}
            label={item.otherUserName?.substring(0, 1)}
          />
        )}
        right={() => <List.Icon icon="chevron-right" />}
      />
    </TouchableOpacity>
  );

  return (
    loading ? (<Loader visible={loading} message={'Loading Chats...'}/>) : (
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.chat_id + Math.random()}
        style={styles.container}
      />
    )

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 20,
  }
});

export default ChatsListScreen;
