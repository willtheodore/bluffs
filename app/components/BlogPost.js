import React from "react"
import { Link } from "react-router-dom"

import { formatDateForDescription } from "../utils/formatters"

export default function BlogPost({ title, date, authorName, content, charLimit = null, postId = null}) {
  const styles = {
    container: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      padding: "10px",
      margin: "0 20px 20px",
      color: "black",
    },
    hr: {
      width: "100%",
      height: "0",
      margin: "5px 0",
      border: "none",
      borderBottom: "2px solid #3892CC"
    },
    header: {
      fontFamily: "heebo-medium",
      fontSize: "48px",
    },
    description: {
      fontFamily: "heebo-light",
      fontSize: "18px",
      margin: "0"
    },
    content: {
      fontFamily: "heebo-regular",
      fontSize: "18px",
      margin: "0"
    }
  }

  let newContent = content.slice()
  if (charLimit != null) {
    let target = charLimit
    for (let i = 0; i < 40; i ++) {
      const char = newContent.charAt(charLimit - 20 + i)
      if (char === "<") {
        target = charLimit - 20 + i
      }
    }
    newContent = content.slice(0, target)
    newContent = newContent.concat(" ...")
  }

  const innerContent = () => {
    return (
      <React.Fragment>
        <h2 style={styles.header}>{title}</h2>
        <p style={styles.description}>
          {`by ${authorName} // posted ${date}`}
        </p>
        <hr style={styles.hr}/>
        <p style={styles.content} dangerouslySetInnerHTML={{__html: newContent}} />
      </React.Fragment>
    )
  }

  if (postId) return (
    <Link style={styles.container} to={`/members/postDetail?postId=${postId}`}>
      {innerContent()}
    </Link>
  )

  return (
    <div style={styles.container}>
      {innerContent()}
    </div>
  )
}
