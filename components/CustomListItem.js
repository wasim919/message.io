import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { ListItem, Avatar } from "react-native-elements"

const CustomListItem = ({ id, chatName, enterChat }) => {
	return (
		<TouchableOpacity onPress={() => enterChat(id, chatName)} activeOpacity={0.5}>
			<ListItem key={id} bottomDivider>
				<Avatar rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
				<ListItem.Content>
					<ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
						This is a chat room.This is a chat room.This is a chat room.This is a chat room.
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	)
}

export default CustomListItem

const styles = StyleSheet.create({})
