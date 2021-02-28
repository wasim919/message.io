import React, { useLayoutEffect } from "react"
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import { Avatar } from "react-native-elements"

import { auth } from "../firebase"

import CustomListItem from "../components/CustomListItem"

const HomePageScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
				</View>
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
