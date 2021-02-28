import React, { useLayoutEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Icon, Input, Button } from "react-native-elements"

import { db } from "../firebase"

const AddChat = ({ navigation }) => {
	const [input, setInput] = useState("")
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Add a new chat",
			headerBackTitle: "Chat"
		})
	}, [navigation])
	const createChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: input
			})
			.then(() => {
				navigation.goBack()
			})
			.catch((err) => alert(err.message))
	}
	return (
		<View style={styles.screen}>
			<Input
				style={styles.inputContainer}
				type="text"
				value={input}
				onChangeText={(text) => setInput(text)}
				placeholder="Enter a chat name"
				leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
				onSubmitEditing={createChat}
			/>
			<Button containerStyle={styles.button} title="Add new Chat" onPress={createChat} />
		</View>
	)
}

export default AddChat

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		padding: 30,
		height: "100%"
		// justifyContent: "center",
		// alignItems: "center"
	},
	inputContainer: {
		// width: 300
	},
	button: {
		// width: 200,
		marginTop: 10
	}
})
