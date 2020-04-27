import * as firebase from "firebase/app"

export interface firebaseItem {
    id:string,
    data:firebase.firestore.DocumentData
}