import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users.js'

const Stories = () => {
  return (
    <View style={{ marginBottom: 13, marginTop: 5 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: 'center', marginLeft: 0 }}>
            <Image source={story.image} style={styles.story} />
            <Text>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + '...'
                : story.user.toLocaleLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  story: {
    marginLeft: 15,
    borderColor: '#ff8501',
    borderWidth: 2,
    borderRadius: 50,
  },
})

export default Stories
