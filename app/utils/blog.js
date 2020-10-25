import { firestore } from "../firebase"
import { formatDateForDescription } from "./formatters"

// Returns a promise containing a JSON object containing the data for a single post document
// that matches the document ID passed to the function. A rejected result contains the error.
export function retrievePostById(id) {
  return new Promise((resolve, reject) => {
    const posts = firestore.collection("posts")

    posts.doc(id).get()
    .then(doc => {
      resolve(doc.data())
    })
    .catch(err => {
      console.log("Error retrieiving posts", err)
      reject(err)
    })
  })
}

// Returns a promise containing an array of JSON objects where each object represents a recent post
// Specify how many recent posts you would like in the params. A rejected result contains the error.
export function getRecentPosts(number) {
  return new Promise((resolve, reject) => {
    let result = new Array()
    const posts = firestore.collection("posts")

    posts.orderBy("datePosted", "desc").limit(number).get()
    .then(posts => {
      posts.forEach(doc => {
        result.push(doc.data())
      })
      resolve(result)
    })
    .catch(err => reject(err))
  })
}

export function formatPosts(posts) {
  const result = posts.slice()
  for (const post of result) {
    post.formattedDate = formatDateForDescription(post.datePosted)
  }
  return result
}

// Returns a promise containing all matching posts in a given month and year. A rejected result contains
// the error.
export function getPostsByDate(month, year) {
  return new Promise((resolve, reject) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthNum = months.indexOf(month)
    if (monthNum < 0) { reject("Invalid month") }
    const result = new Array()
    firestore.collection("posts")
    .where("month", "==", monthNum)
    .where("year", "==", (year - 2000 + 100))
    .get()
    .then(posts => {
      posts.forEach(post => {
        const postData = post.data()
        result.push({
          postId: post.id,
          ...postData
        })
      })
      resolve(result)
    })
    .catch(err => reject(err.message))
  })
}
