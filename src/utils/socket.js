import io from 'socket.io-client'
// io.connect(null,{'force new connection':true})
const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  // path:'/ws',
  upgrade: false,
  autoConnect: true
})
// const socket = io('ws://free.qydev.com:4063', {
//   transports: ['websocket'],
//   path:"/",
//   query:{},
//   upgrade: true,
//   autoConnect: false
// })
export default socket