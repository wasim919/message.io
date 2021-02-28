import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import { db } from "../firebase"
import firebase from "firebase"

const CustomListItem = ({ id, chatName, enterChat }) => {
	const [messages, setMessages] = useState([])
	useEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
		return unsubscribe
	}, [])
	return (
		<TouchableOpacity onPress={() => enterChat(id, chatName)} activeOpacity={0.5}>
			<ListItem key={id} bottomDivider>
				<Avatar
					rounded
					source={{ uri: messages?.[0]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
						{messages?.[0]?.displayName}: {messages?.[0]?.message}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	)
}

export default CustomListItem

const styles = StyleSheet.create({})
