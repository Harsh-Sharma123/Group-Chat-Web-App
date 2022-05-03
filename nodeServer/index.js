// Node Server which will handle socket.io connections

const io = require("socket.io")(8000, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"]
    }
  });


const user = {};

io.on("connection", socket => {
    socket.on('new-user-joined', name => {
        // console.log("new user ", name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]});
    });

    socket.on('disconnect', name=>{
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id];
    });
})