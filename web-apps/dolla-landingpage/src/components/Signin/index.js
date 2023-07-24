import React from 'react'
import {
  Container,
  Logo,
  FormContent,
  FormH1,
  Form,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from './SigninComponents'

const Signin = () => {
  return (
    <Container>
      <Logo>dolla</Logo>
      <FormContent>
        <FormH1>Sign in to your account</FormH1>
        <Form>
          <FormLabel for="email">Email</FormLabel>
          <FormInput type="text" id="email"></FormInput>
          <FormLabel for="pass">Password</FormLabel>
          <FormInput id="pass"></FormInput>
          <FormButton type="submit">Continue</FormButton>
          <Text>Forgot password</Text>
        </Form>
      </FormContent>
    </Container>
  )
}

export default Signin
