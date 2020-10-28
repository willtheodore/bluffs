import _ from "lodash"
import firebase, { firestore } from "../firebase"
import { formatDateForDescription } from "./formatters"

// Returns a promise containing a JSON object containing the data for a single post document
// that matches the document ID passed to the function. A rejected result contains the error.
export function retrievePostById(id) {
  return new Promise((resolve, reject) => {
    firestore.collection("posts").doc(id).get()
    .then(doc => {
      resolve(doc.data())
    })
    .catch(err => {
      console.log("Error retrieiving posts", err)
      reject(err)
    })
  })
}

export function setPostListenerById(id, handlePost) {
  const unsubscribe = firestore.collection("posts").doc(id).onSnapshot(doc => {
    handlePost(doc.data())
  })
  return unsubscribe
}

// Returns a promise containing an array of JSON objects where each object represents a recent post
// Specify how many recent posts you would like in the params. A rejected result contains the error.
export function getRecentPosts(number) {
  return new Promise((resolve, reject) => {
    let result = new Array()
    const posts = firestore.collection("posts")

    posts.orderBy("datePosted", "desc").limit(number).get()
    .then(posts => {
      posts.forEach(post => {
        const data = post.data()
        result.push({
          ...data,
          postId: post.id
        })
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

export function addNewPost(uid, displayName, timestamp, title, content) {
  return new Promise((resolve, reject) => {
    firestore.collection("posts").add({
      author: uid,
      authorName: displayName,
      title: title,
      content: content,
      datePosted: timestamp,
      month: timestamp.getMonth(),
      year: timestamp.getYear(),
    })
    .then(docRef => resolve(docRef))
    .catch(err => reject(err.message))
  })
}

export function postComment(postId, uid, displayName, timestamp, content, comments) {
  return new Promise((resolve, reject) => {
    const newCommentKey = timestamp.getTime().toString()
    firestore.collection("posts").doc(postId).update({
      comments: {
        [newCommentKey]: {
          "author": uid,
          "authorName": displayName,
          "datePosted": timestamp,
          "content": content,
        },
        ...comments
      }
    })
    .then(docRef => resolve(docRef))
    .catch(err => reject(err.message))
  })
}

export function deleteCommentById(postId, id, comments) {
  return new Promise((resolve, reject) => {
    let updates = { comments: null }
    const oldCommentKey = `comments.${id}`
    firestore.collection("posts").doc(postId).update({
      [oldCommentKey]: firebase.firestore.FieldValue.delete()
    })
    .then(docRef => resolve(docRef))
    .catch(err => reject(err.message0))
  })
}

// Returns a promise containing all matching posts in a given month and year. A rejected result contains
// the error.
export function getPostsByDate(month, year) {
  return new Promise((resolve, reject) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthNum = months.indexOf(month)
    if (monthNum < 0) { reject("Invalid month") }
    let result = new Array()
    firestore.collection("posts")
    .where("month", "==", monthNum)
    .where("year", "==", (year - 2000 + 100))
    .get()
    .then(posts => {
      posts.forEach(post => {
        let postData = post.data()
        result.push({
          postId: post.id,
          ...postData
        })
      })
      debugger;
      result = _.sortBy(result, ["datePosted"])
      _.reverse(result)
      resolve(result)
    })
    .catch(err => reject(err.message))
  })
}
