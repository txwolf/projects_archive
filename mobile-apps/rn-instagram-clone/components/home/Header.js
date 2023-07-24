import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const handleSignout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/insta.png')}
        />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('NewPostScreen')}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/add.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('../../assets/images/heart.jpg')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            style={styles.icon}
            source={require('../../assets/images/direct.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 32,
    bottom: 18,
    width: 22,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
})

export default Header
