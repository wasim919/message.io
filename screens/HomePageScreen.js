import React, { useLayoutEffect, useEffect, useState } from "react"
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-elements"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

import { auth, db } from "../firebase"

import CustomListItem from "../components/CustomListItem"

const HomePageScreen = ({ navigation }) => {
	const [chats, setChats] = useState([])
	const signOutUser = () => {
		auth.signOut()
			.then(() => {
				navigation.replace("Login")
			})
			.catch((err) => console.log(err.message))
	}
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
					<View style={{ marginLeft: 20 }}>
						<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
					</View>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name="camerao" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
						<SimpleLineIcons name="pencil" size={24} color="black" />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])

	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data()
				}))
			)
		)
		return unsubscribe
	}, [])
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats.map(({ id, data: { chatName } }) => (
					<CustomListItem key={id} id={id} chatName={chatName} />
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomePageScreen

const styles = StyleSheet.create({
	container: {
		height: "100%"
	}
})
