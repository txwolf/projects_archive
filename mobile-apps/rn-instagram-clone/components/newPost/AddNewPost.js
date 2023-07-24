import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
import { useNavigation } from '@react-navigation/core'

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FormikPostUploader />
    </View>
  )
}

const Header = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{ width: 35, height: 35 }}
          source={require('../../assets/images/chevron_left.png')}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post</Text>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    marginRight: 25,
  },
})

export default AddNewPost
