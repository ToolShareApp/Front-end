import React, { useContext, useEffect, useRef, useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	StyleSheet,
	View,
	Platform,
	Dimensions,
} from "react-native";
import { TextInput, Avatar, Paragraph } from "react-native-paper";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { GreenTheme } from "../Themes/GreenTheme";
import { useRoute } from "@react-navigation/native";
import { io, Socket } from "socket.io-client";
import FormatDate from "../Components/FormatDate";
import Loader from "../Components/Loader";

const screenWidth = Dimensions.get("window").width;
const maxMessageWidth = screenWidth * 0.8;

interface Message {
	messageId: number;
	username: string;
	userId: number;
	userAvatar: string | null;
	text: string;
	date: string;
	status: number;
}

let socket: Socket;
const ChatScreen: React.FC = () => {
	const { user, api } = useContext(GlobalStateContext);
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState<boolean>(true);
	const flatListRef = useRef<FlatList>();
	const route = useRoute();
	const { user_id, tool_name, listing_id, title, recordId, chatId } =
		route.params;

	useEffect(() => {
		socket = io("wss://nc-toolshare.onrender.com", {
			// @TODO wss://nc-toolshare.onrender.com
			auth: {
				userId: user.profile_id,
				token: "secretToken",
			},
			query: {
				chatId: chatId ? chatId : recordId,
			},
		});

		socket.on("connect", () => {
			console.log("connected");
			// Load messages
			getMessagesByChatId();
		});

		socket.on("message", (message: Message) => {
			console.log("received: ", message, messages);
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.close();
		};
	}, []);

	useEffect(() => {
		flatListRef.current?.scrollToEnd({ animated: true });
	}, [messages]);

	const getMessagesByChatId = async () => {
		if (chatId || recordId) {
			try {
				const response = await api.get(
					`/message/chat/${chatId ? chatId : recordId}`
				);
				setMessages(response.data.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				alert(error);
			}
		}
	};

	const postNewMessage = async () => {
		if (chatId || recordId) {
			try {
				socket.emit("message", {
					text,
				});
				setText("");
			} catch (error) {
				alert(error);
				console.error(error);
			}
		} else {
			alert("Error ChatId or RecordId is missing");
		}
	};

	return (
		<>
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={(item) => item.messageId.toString()}
				renderItem={({ item }) =>
					loading ? (
						<Loader visible={true} message={"Loading Messages..."} />
					) : (
						<View
							style={[
								styles.message,
								item.userId === user.profile_id
									? styles.messageRight
									: styles.messageLeft,
							]}>
							{item.userId !== user.profile_id &&
								(item.userAvatar ? (
									<Avatar.Image
										size={46}
										source={{ uri: item.userAvatar }}
										style={styles.avatar}
									/>
								) : (
									<Avatar.Text
										size={46}
										label={item.username.substring(0, 1)}
										style={styles.avatar}
									/>
								))}
							<View style={styles.messageContainer}>
								<View
									style={[
										styles.messageBody,
										item.userId === user.profile_id
											? styles.alightMessageRight
											: styles.alightMessageLeft,
									]}>
									<Paragraph style={styles.username}>{item.username}</Paragraph>
									<Paragraph>{item.text}</Paragraph>
									<Paragraph style={styles.dateText}>
										<FormatDate dateString={item.date} />
									</Paragraph>
								</View>
							</View>
							{item.userId === user.profile_id &&
								(user.picture_url ? (
									<Avatar.Image
										size={46}
										source={{ uri: user.picture_url }}
										style={styles.avatar}
									/>
								) : (
									<Avatar.Text
										size={46}
										label={user.display_name.substring(0, 1)}
										style={styles.avatar}
									/>
								))}
						</View>
					)
				}
			/>
			<KeyboardAvoidingView>
				<TextInput
					label="Type a message..."
					value={text}
					multiline
					onChangeText={(text) => setText(text)}
					style={styles.input}
					right={
						<TextInput.Icon
							name="send"
							onPress={postNewMessage}
							icon={"send"}
						/>
					}
				/>
			</KeyboardAvoidingView>
		</>
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
		maxWidth: "100%",
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
