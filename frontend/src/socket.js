// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  withCredentials: true,
});

export default socket;


// // src/socket.js
// import { io } from 'socket.io-client';

// const socket = io(`${process.env.BACKEND_URL}`, {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'abcd'
//   }
// });

// export default socket;
