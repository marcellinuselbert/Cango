export type Chat = {
    uid: string,
    message: string,
    text: string,
    createdAt: firebase.default.firestore.Timestamp,
    displayName: string,
    photoURL: string
}