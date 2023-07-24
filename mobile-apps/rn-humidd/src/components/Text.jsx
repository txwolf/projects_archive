import { StyleSheet, Text as DefaultText, View } from 'react-native'
import React from 'react'

const Text = ({ children, style }) => {
  return <DefaultText style={[styles.text, style]}>{children}</DefaultText>
}

export default Text

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
})
