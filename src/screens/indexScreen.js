import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';  
import { Context } from '../context/BlogContext'

export default function indexScreen({ navigation }) {
  const { state, deleteBlogPost } = useContext( Context)
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Show', { id: item.id })
            }}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => {
                  deleteBlogPost(item.id)
                }}>
                  <Feather style={styles.icon} name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

indexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{ marginRight: 10 }} 
          onPress={() => {
            navigation.navigate('Create')
          }}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
})
