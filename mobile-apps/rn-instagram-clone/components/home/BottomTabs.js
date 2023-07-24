import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BottomTabs = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingTop: 13,
      }}
    >
      <Icon
        iconStyle={[styles.footerIcon, styles.footerIconHeart]}
        iconSource={require('../../assets/images/home.png')}
      ></Icon>
      <Icon
        iconStyle={styles.footerIcon}
        iconSource={require('../../assets/images/search.png')}
      ></Icon>
      <Icon
        iconStyle={[styles.footerIcon]}
        iconSource={require('../../assets/images/tv.png')}
      ></Icon>
      <Icon
        iconStyle={[styles.footerIcon]}
        iconSource={require('../../assets/images/collection.png')}
      ></Icon>
      <Icon
        iconStyle={[styles.footerIcon, styles.footerIconLast]}
        iconSource={require('../../assets/images/ic1.png')}
      ></Icon>
    </View>
  )
}

const Icon = ({ iconStyle, iconSource }) => (
  <TouchableOpacity>
    <Image style={iconStyle} source={iconSource}></Image>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  story: {
    width: 32,
    height: 32,
    borderColor: '#ff8501',
    borderWidth: 2,
    borderRadius: 50,
  },
  footerIcon: {
    width: 29,
    height: 29,
    marginRight: 15,
    resizeMode: 'contain',
  },
  footerIconHeart: {
    resizeMode: 'contain',
  },
  footerIconLast: {
    marginRight: 0,
  },
})

export default BottomTabs
