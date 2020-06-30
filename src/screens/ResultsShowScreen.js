import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import yelp from '../api/yelp'
import { Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'; 
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
    <View style={{ flex: 1 }}>
      { result ? <Text style={styles.title}>{result.name}</Text> : null }
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        data={result.photos}
        keyExtractor={(photo) => photo }
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
      <View style={styles.resultInfo}>
        <Text style={{ marginTop: 4, marginBottom: 10, fontSize: 22}}>
          {result.name} is currently { result.is_closed ? 'closed' : 'open'}
        </Text>
        <View style={styles.location}>
          <Entypo name="location" size={24} color="black" />
          <Text style={styles.textInfo}>{result.location['display_address'][0]}</Text>
          <Text style={styles.textInfo}>{result.location['display_address'][1]}</Text>
        </View>
        <View style={styles.location}>
          <Entypo name="star" size={24} color="black" />
          <Text style={styles.textInfo}>{result['rating']} / 5 Stars</Text>
          <Text style={styles.textInfo}>{result['review_count']} Reviews</Text>
        </View>
        <View style={styles.location}>
          <Entypo name="phone" size={24} color="black" />
          <Text style={styles.textInfo}>{result['display_phone']}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    flex: 1
  },
  resultInfo: {
    justifyContent: 'flex-start',
    padding: 15,
    marginHorizontal: 10,
    marginTop: -40,
    flex: 2
  },
  location: {
    paddingVertical: 10,
    margin: 10,
    fontSize: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInfo:{ flex: 1, marginLeft: 20 },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5
  },
  image: {
    width: 300,
    height: 200,
    marginHorizontal: 10
  }
})
