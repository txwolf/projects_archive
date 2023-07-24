import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import Conversation from '../../components/conversation/Conversation'
import Topbar from '../../components/topbar/Topbar'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/chatOnline'
import { io } from 'socket.io-client'

import './messenger.css'
import { AuthContext } from '../../context/AuthContext'

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useContext(AuthContext)
  const socket = useRef()
  const scrollRef = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('receiveMessage', (message) => {
      setArrivalMessage({
        sender: message.senderId,
        text: message.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((messages) => [...messages, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f)),
      )
    })
  }, [user._id])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/conversations/' + user._id)
        setConversations(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchConversations()
  }, [user])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/messages/' + currentChat._id)
        setMessages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(
      (member) => member._id !== user._id,
    )
    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try {
      const response = await axios.post('/messages', message)
      setMessages([...messages, response.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
