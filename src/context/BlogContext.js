import React, { useState } from 'react'

const BlogContext = React.createContext()

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([])
  // const blogPosts = [
  //   {
  //     title: 'Blog post 1'
  //   },
  //   {
  //     title: 'Blog post 2'
  //   }
  // ]

  const addBlogPost = () => {
    setBlogPosts([...blogPosts, { title: `Blog post #${blogPosts.length + 1}`}])
  }
  return (
    <BlogContext.Provider value={{
      data: blogPosts,
      addBlogPost
    }}>{children}</BlogContext.Provider>
  )
}

export default BlogContext
