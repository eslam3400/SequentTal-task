import React from 'react'
import './style.css'

function PostComponent({ post }) {
  return (
    <div className='post-card'>
      <div className='header'>
        <h1>{post.title}</h1>
        <p>{new Date(post.created_at).toLocaleDateString()}</p>
      </div>
      <p>{post.content}</p>
    </div>
  )
}

export default PostComponent