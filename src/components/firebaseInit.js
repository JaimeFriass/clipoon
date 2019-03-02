import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const settingsF = {
    timestampsInSnapshots: true
}

firebaseApp.firestore().settings(settingsF)
export default firebaseApp.firestore()