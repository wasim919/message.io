import React, { useLayoutEffect, useState } from "react"
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback
} from "react-native"
import { Avatar } from "react-native-elements"
import { StatusBar } from "expo-status-bar"
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import firebase from "firebase"
import { db, auth } from "../firebase"

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("")
	const [messages, setMessages] = useState([])

	const { id, chatName } = route.params

	useLayoutEffect(() => {
		navigation.setOptions({
			title: chatName,
			headerTitleAlign: "left",
			headerBackTitleVisible: false,
			headerTitle: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center"
					}}
				>
					<Avatar rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
					<Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{chatName}</Text>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
					<TouchableOpacity>
						<FontAwesome name="video-camera" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])
	const sendMessage = () => {
		Keyboard.dismiss()
		db.collection("chats").doc(id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL
		})
		setInput("")
	}
	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data()
					}))
				)
			)
		return unsubscribe
	}, [route])
	console.log(messages)
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "android" ? "height" : "padding"}
				keyboardVerticalOffset={100}
			>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<>
						<ScrollView></ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onChangeText={(text) => setInput(text)}
								placeholder="Signal Message"
								style={styles.textInput}
							/>
							<TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default ChatScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		borderColor: "transparent",
		backgroundColor: "#ECECEC",
		borderWidth: 1,
		padding: 10,
		color: "grey",
		borderRadius: 30
	}
})
