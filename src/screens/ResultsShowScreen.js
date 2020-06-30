import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import yelp from '../api/yelp'
import { Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function ResultsShowScreen({ navigation }) {
  const [result, setResult] = useState(null)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }
  useEffect(() => {
    getResult(id)
  }, [])
  if(!result){
    return null
  }
  return (
    <View>
      { result ? <Text style={styles.title}>{result.name}</Text> : null }
      <FlatList
        style={styles.container}
        data={result.photos}
        keyExtractor={(photo) => photo }
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginVertical: 15
  }
})
