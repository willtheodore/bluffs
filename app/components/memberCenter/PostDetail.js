import React from "react"
import { useLocation } from "react-router-dom"
import { retrievePostById } from "../../utils/blog"

import BlogPost from "../BlogPost"

export default function PostDetail() {
  const [post, setPost] = React.useState(null)
  const location = useLocation()

  return (
    <div id="post-detail">
      <pre>Location: {JSON.stringify(location, null, 2)}</pre>
      {post != null && (
        <BlogPost
            title={post.title}
            authorName={post.authorName}
            date={post.formattedDate}
            content={post.content}
        />
      )}
    </div>

  )
}
