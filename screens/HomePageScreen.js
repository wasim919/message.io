import React from "react"
import { StyleSheet, Text, ScrollView, SafeAreaView } from "react-native"

import CustomListItem from "../components/CustomListItem"

const HomePageScreen = () => {
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
