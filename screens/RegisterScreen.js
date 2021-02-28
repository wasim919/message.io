import React, { useState } from "react"
import { StyleSheet, View, KeyboardAvoidingView } from "react-native"
import { Input, Button, Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar"
import { auth } from "../firebase"

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [imageURL, setImageURL] = useState("")

	const register = () => {
		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				console.log(authUser)
				authUser.user.updateProfile({
					displayName: name,
					photoURL: imageURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
				})
			})
			.catch((err) => alert(err.message))
	}
	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} style={styles.container}>
			<StatusBar style="light" />
			<Text h3 style={{ marginBottom: 50 }}>
				Create a Signal account
			</Text>
			<View style={styles.inputContainer}>
				<Input placeholder="Full Name" value={name} onChangeText={(text) => setName(text)} autoFocus type="text" />
				<Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} type="email" />
				<Input placeholder="Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} type="password" />
				<Input
					placeholder="Profile Picture URL (optional)"
					value={imageURL}
					onChangeText={(text) => setImageURL(text)}
					type="image"
					onSubmitEditing={register}
				/>
			</View>
			<Button raised containerStyle={styles.button} title="Register" onPress={register} />
		</KeyboardAvoidingView>
	)
}

export default RegisterScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: "white"
	},
	inputContainer: {
		width: 300
	},
	button: {
		width: 300,
		marginTop: 10
	}
})
