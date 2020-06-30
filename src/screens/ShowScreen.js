import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context } from '../context/BlogContext'
export default function ShowScreen({ navigation }) {
  const { state } = useContext(Context)
  const blogPost = state.find(blogPost => {
    return blogPost.id === navigation.getParam('id')
  })
  return (
    <View>
      <Text>{blogPost.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
