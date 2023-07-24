import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'

const Detail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, 'movies', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        console.log('No such document!')
      }
      setMovie(docSnap.data())
    }
    fetch()
    return () => {
      setMovie({})
    }
  }, [id])

  return (
    <Container>
      <Logo>
        <img src={movie.titleImg} alt="" />
      </Logo>
      <ActionsWrapper>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="" />
          <span>PLAY</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="" />
          <span>TRAILER</span>
        </TrailerButton>
        <RoundButton>
          <img src="/images/watchlist-icon.svg" alt="" />
        </RoundButton>
        <RoundButton>
          <img src="/images/group-icon.png" alt="" />
        </RoundButton>
      </ActionsWrapper>
      <Details>{movie.subTitle}</Details>
      <Description>{movie.description}</Description>
      <BgImage>
        <img src={movie.backgroundImg} alt={movie.title} />
      </BgImage>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 70px;
  overflow: hidden;
  height: calc(100vh - 70px);
`

const Logo = styled.div`
  margin-top: 70px;
  margin-left: 30px;
  img {
    width: 350px;
  }

  @media (max-width: 476px) {
    margin-top: 40px;
  }
`

const ActionsWrapper = styled.div`
  margin: 40px 40px 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 23px;
  font-size: 16px;
  letter-spacing: 1.5px;
  background: white;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 476px) {
    font-size: 15px;
    padding: 5px 13px;
  }
`

const TrailerButton = styled(PlayButton)`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid white;
`

const RoundButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 45px;
  min-height: 45px;
  width: 45px;
  height: 45px;
  img {
    width: 80%;
    height: 80%;
  }
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  outline: none;
  border-radius: 50%;
`

const Details = styled.p`
  margin: 0 40px 20px;
`

const Description = styled.p`
  margin: 0 40px 20px;
  font-size: 18px;
  letter-spacing: 1.3px;
  line-height: 1.5;
`

const BgImage = styled.div`
  img {
    object-fit: cover;
    height: 100%;
    width: 100vw;
    opacity: 0.8;
  }
  z-index: -1;
  position: absolute;
  top: 70px;
  left: 0;
  height: calc(100vh - 70px);
  overflow: hidden;
`

export default Detail
