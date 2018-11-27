import firebase from 'firebase/app';
import 'firebase/database';

const DB_CONFIG = {
	apiKey: "AIzaSyAOG_PUtYsxBgtfsUDuwhvI7oA0SrA9zGc",
	authDomain: "react-todos-artlav.firebaseapp.com",
	databaseURL: "https://react-todos-artlav.firebaseio.com",
	projectId: "react-todos-artlav",
	storageBucket: "react-todos-artlav.appspot.com",
	messagingSenderId: "294903311306"
};

const fire = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();

export default fire;