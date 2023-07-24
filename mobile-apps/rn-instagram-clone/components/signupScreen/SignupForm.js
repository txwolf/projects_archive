import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

const signupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .min(2, 'Username needs to have at least 2 characters'),
  email: Yup.string().email().required('An email is required'),
  password: Yup.string()
    .required()
    .min(6, 'Password needs to have at least 6 characters'),
})

const getRandomProfilePicture = async () => {
  const response = await fetch('https://randomuser.me/api')
  const data = await response.json()
  return data.results[0].picture.large
}

const SignupForm = () => {
  const navigation = useNavigation()

  const onSignup = async (email, username, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      console.log(`Signed Up 🔥`)
      console.log(user)
      addDoc(collection(db, 'users'), {
        owner_uid: user.uid,
        username: username,
        email: user.email,
        profile_picture: await getRandomProfilePicture(),
      })
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      Alert.alert(errorMessage)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={(values) =>
          onSignup(values.email, values.username, values.password)
        }
        validateOnMount
        validationSchema={signupValidationSchema}
      >
        {({ handleChange, handleSubmit, handleBlur, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                values={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length > 2
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholder="Username"
                secureTextEntry={false}
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                values={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                textContentType="password"
                placeholderTextColor="#444"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                values={values.password}
              />
            </View>

            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text style={{ color: '#6BB0F5' }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  wrapper: {
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
    flex: 1,
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
  },
  button: (isValid) => ({
    marginTop: 20,
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  footer: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
})

export default SignupForm
