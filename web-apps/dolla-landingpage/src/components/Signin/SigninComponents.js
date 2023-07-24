import styled from 'styled-components'

export const Container = styled.div`
  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(180deg, rgba(1, 191, 113, 1) 0%, rgba(1, 191, 113, 1) 100%);
  height: 100vh;
`

export const Logo = styled.div`
  font-weight: 700;
  color: #fff;
  font-size: 1.5rem;
  padding: 25px 0 0 25px;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #010606;
  margin: 2rem auto;
  max-width: 220px;
  border-radius: 5px;
  padding: 2.7rem 0;
`

export const FormH1 = styled.h1`
  color: #fff;
  font-size: 0.7rem;
  font-weight: 400;
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`

export const FormLabel = styled.label`
  color: #fff;
  font-size: 0.6rem;
  align-self: flex-start;
  margin-left: 0.4rem;
  margin-top: 1.1rem;
  margin-bottom: 0.1rem;
`

export const FormInput = styled.input`
  height: 1.6rem;
`

export const FormButton = styled.button`
  width: 94%;
  margin: 0.9rem 2rem;
  border: none;
  outline: none;
  background: rgba(1, 191, 113, 1);
  color: #fff;
  border-radius: 3px;
  height: 30px;
  font-size: 0.7rem;
`

export const Text = styled.a`
  color: #fff;
  font-size: 0.6rem;
`
