export type Chat = {
    uid: string,
    text: string,
    createdAt: firebase.default.firestore.Timestamp,
    displayName: string,
    photoURL: string,
    id:string
}