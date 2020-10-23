import firebase from "../firebase"

const expandedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                       'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                       'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4',
                       '5', '6', '7', '8', '9', '0', '?', '!', '\'', '+',
                       '@', '#', '$', '%', '^', '&', '*', '_', '-', '=',
                       '/', '|']

const narrowChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                     'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                     'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4',
                     '5', '6', '7', '8', '9', '0', '-']

function checkCharacters(validChars, string) {
  const token = string.toLowerCase()
  for (let i = 0; i < token.length; i++) {
    const char = validChars.find(element => element === token[i])
    if (char === undefined) { return false }
  }
  return true
}

export function signOut() {
  firebase.auth().signOut()
  console.log("NOT DONE")
}

export function signInUser(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => resolve("success"))
    .catch(err => {
      console.log(err.message)
      reject(err.message)
    })
  })
}

export function validateEmail(email) {
  // check for @ sign
  const breakIndex = email.indexOf("@")
  if (breakIndex === -1) { return false }

  // check for valid recipient name
  const name = email.slice(0, breakIndex)
  if (!checkCharacters(expandedChars, name)) { return false }

  // check for . in suffix
  const suffix = email.slice(breakIndex + 1)
  const dotIndex = suffix.indexOf(".")
  if (dotIndex === -1) { return false }

  // check for valid domain (pre extension)
  const domain = suffix.slice(0, dotIndex)
  if (!checkCharacters(narrowChars, domain)) { return false }

  // check for valid extension
  const validExtensions = ["com", "net", "org", "co", "uk"]
  const ext = suffix.slice(dotIndex + 1)
  const match = validExtensions.find(element => element === ext)
  if (match === undefined) { return false }

  return true
}

export function validatePassword(password) {
  const length = password.length

  // check for invalid characters
  if (!checkCharacters(expandedChars, password)) { return false }

  // check for proper length
  if (length < 8 || length > 20) { return false }

  return true
}
