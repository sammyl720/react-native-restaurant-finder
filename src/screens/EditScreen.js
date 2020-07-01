import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import BlogPostForm from '../components/BlogPostForm'
import { Context } from '../context/BlogContext'

export default function EditScreen({ navigation }) {
  const { state, editBlogPost } = useContext(Context)
  const id = navigation.getParam('id')
  const blogPost = state.find(bp => bp.id === id)
  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => {
          navigation.pop()
        })
      }}
    />
  )
}

const styles = StyleSheet.create({})
