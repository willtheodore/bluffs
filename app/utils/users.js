import firebase, { firestore } from "../firebase"

export function getUserById(id) {
  return new Promise((resolve, reject) => {
    const users = firestore.collection("users")

    users.doc(id).get()
    .then(user => resolve(user.data()))
    .catch(err => reject(err))
  })
}

export function addUserToFirestore(email, firstName, lastName) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser
    if (!user) { reject("No one is signed in") }

    firestore.collection("users").doc(user.uid).set({
      email: email,
      displayName: `${firstName} ${lastName}`
    })
    .then(success => resolve("success"))
    .catch(err => reject(err.message))
  })
}

export function addUserToAdmins(id) {
  return new Promise((resolve, reject) => {
    firestore.collection("users").doc("admins").set({
      [id]: true
    })
    .then(success => resolve("success"))
    .catch(err => reject(err.message))
  })
}

export function removeUserFromAdmins(id) {
  return new Promise((resolve, reject) => {
    firestore.collection("users").doc("admins").update({
      [id]: firebase.firestore.FieldValue.delete()
    })
    .then(success => resolve("success"))
    .catch(err => reject(err.message))
  })
}

export function determineIfAdmin(user, admins) {
  if (user && admins) {
    debugger;
    if (admins[user.uid]) { return true }
  }
  return false
}

export function getAdmins() {
  return new Promise((resolve, reject) => {
    firestore.collection("users").doc("admins").get()
    .then(admins => resolve(admins.data()))
    .catch(err => reject(err.message))
  })
}
