import React, { useLayoutEffect } from "react"
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-elements"

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
			)
		})
	}, [])
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
