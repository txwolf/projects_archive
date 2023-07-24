import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './conversation.css'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const friendId = conversation.members.find((m) => m === currentUser._id)
    const getUser = async () => {
      const response = await axios.get(`/users?userId=${friendId}`)
      setUser(response.data)
    }
    getUser()
  }, [conversation.members, currentUser._id])

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation
