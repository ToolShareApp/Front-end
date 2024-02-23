import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Chat {
	id: string;
	name: string;
	userAvatar: string;
	lastMessage: string;
	lastMessageDate: string;
	createdByUserId: string;
}

const chatsData: Chat[] = [
	{
		id: '1',
		name: 'Sam',
		userAvatar: '',
		lastMessage: 'Hey, I would like to get this tool',
		lastMessageDate: 'Today, 5:00 PM',
		createdByUserId: '1'
	},
	{
		id: '2',
		name: 'Olivia',
		userAvatar: '',
		lastMessage: 'Meeting at 10 AM',
		lastMessageDate: 'Yesterday, 9:00 AM',
		createdByUserId: '2'
	},
	{
		id: '3',
		name: 'Cristina',
		userAvatar: '',
		lastMessage: 'Meeting at 10 AM',
		lastMessageDate: 'Yesterday, 9:00 AM',
		createdByUserId: '3'
	},
	{
		id: '4',
		name: 'Viktoria',
		userAvatar: '',
		lastMessage: 'Meeting at 10 AM',
		lastMessageDate: 'Yesterday, 9:00 AM',
		createdByUserId: '4'
	},
	{
		id: '5',
		name: 'Viktor',
		userAvatar: '',
		lastMessage: 'Meeting at 10 AM',
		lastMessageDate: 'Yesterday, 9:00 AM',
		createdByUserId: '5'
	},
];

const ChatsListScreen = () => {
	const navigation = useNavigation();

	const renderItem = ({ item }: { item: Chat }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate('ChatScreen', { chatId: item.id, title: item.name})}
		>
			<List.Item
				title={item.name}
				description={item?.lastMessage}
				descriptionNumberOfLines={1}
				left={props => <Avatar.Icon {...props} icon="forum" />}
				right={props => <List.Icon {...props} icon="chevron-right" />}
			/>
		</TouchableOpacity>
	);

	return (
		<FlatList
			data={chatsData}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			style={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export  default ChatsListScreen;