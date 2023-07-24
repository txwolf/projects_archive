import { StyleSheet, Text, View, Image as DefaultImage } from 'react-native'
import React from 'react'

const Image = (props) => {
  return (
    <DefaultImage {...props} style={[styles.image, props.style]}>
      {props.children}
    </DefaultImage>
  )
}

export default Image

const styles = StyleSheet.create({
  image: {
    // add shadows for iOS only
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
})
