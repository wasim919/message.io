import React, { useState } from "react"
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native"
import { Button, Input, Image } from "react-native-elements"
import { StatusBar } from "expo-status-bar"

const LoginScreen = ({ navigation, route }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const signIn = () => {}
	const register = () => {
		navigation.navigate("Register")
	}
	return (
		<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={20} style={styles.container}>
			<StatusBar style="light" />
			<Image
				source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
				style={{ width: 200, height: 200 }}
			/>
			<View style={styles.inputContainer}>
				<Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(email) => setEmail(email)} />
				<Input
					placeholder="Password"
					secureTextEntry
					type="password"
					value={password}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
			<Button containerStyle={styles.button} onPress={signIn} title="Login" />
			<Button containerStyle={styles.button} onPress={register} type="outline" title="Register" />
		</KeyboardAvoidingView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white"
	},
	inputContainer: {
		width: 300
	},
	button: {
		width: 200,
		marginTop: 10
	}
})
