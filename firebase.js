import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

export const firebaseConfig = {
	apiKey: "AIzaSyB00hDC4IJ2MKuav_UsoH7xDD-iMaeiSko",
	authDomain: "signal-clone-4e975.firebaseapp.com",
	projectId: "signal-clone-4e975",
	storageBucket: "signal-clone-4e975.appspot.com",
	messagingSenderId: "233911090773",
	appId: "1:233911090773:web:adac78102e5fcb69289edc"
}

let app
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig)
} else {
	app = firebase.app()
}

const db = app.firestore()

const auth = firebase.auth()

export { db, auth }
