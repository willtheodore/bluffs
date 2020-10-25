import { firestore } from "../firebase"

export function getUserById(id) {
  return new Promise((resolve, reject) => {
    const users = firestore.collection("users")

    users.doc(id).get()
    .then(user => resolve(user.data()))
    .catch(err => reject(err))
  })
}
