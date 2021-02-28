import React, { useLayoutEffect } from "react"
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-elements"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

import { auth } from "../firebase"

import CustomListItem from "../components/CustomListItem"

const HomePageScreen = ({ navigation }) => {
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
	return (
		<SafeAreaView>
			<ScrollView>
				<CustomListItem />
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomePageScreen

const styles = StyleSheet.create({})
