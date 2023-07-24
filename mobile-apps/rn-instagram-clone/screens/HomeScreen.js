import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/post/Post'
import { POSTS } from '../data/posts'
import BottomTabs from '../components/home/BottomTabs'

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} />
        ))}
      </ScrollView>
      <BottomTabs />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default HomeScreen
