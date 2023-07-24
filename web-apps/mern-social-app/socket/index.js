const io = require('socket.io')(8900, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let users = []
const addUser = (socketId, userId) => {
  !users.some(user => user.userId === userId) && users.push({ socketId, userId })
}
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}
const getUser = (userId) => users.find(user => user.userId === userId)

io.on('connection', (socket) => {
  console.log('a user connected')

  // take user id and socket id from user
  socket.on('addUser', userId => {
    addUser(socket.id, userId)
    io.emit('getUsers', users)
  })

  // send and get message
  socket.on('sendMessage', ({senderId, receiverId, text}) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit('receiveMessage', {
      senderId, text
    })
  })

  // when disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

