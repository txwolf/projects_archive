import React from 'react'
import './Player.css'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'

const Player = ({ spotify }) => {
  return (
    <div className="player">
      <div className="player__body">
        <div className="sidebar__container">
          <Sidebar />
        </div>
        <div className="body__container">
          <Body spotify={spotify} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Player
