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
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import Validator from 'email-validator'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('An email is required'),
  password: Yup.string()
    .required()
    .min(6, 'Password needs to have at least 6 characters'),
})

const LoginForm = () => {
  const navigation = useNavigation()

  const onLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(`Logged in 🔥`)
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        Alert.alert('❌ Incorrect password', errorMessage, [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
          { text: 'Sign Up', onPress: () => navigation.push('SignupScreen') },
        ])
      })
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validateOnMount
        validationSchema={loginValidationSchema}
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
                placeholder="Phone number, username or email"
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

            <TouchableOpacity style={styles.forgotWrapper}>
              <Text style={{ color: '#0096F6' }}>Forgot password?</Text>
            </TouchableOpacity>

            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{ color: '#6BB0F5' }}>Sign Up</Text>
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

export default LoginForm
