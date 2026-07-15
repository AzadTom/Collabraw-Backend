import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on('connection', (socket) => {

    socket.on("client-ready", () => {

        console.log("connected!");
        socket.broadcast.emit("server-ready");

    });


    socket.on('rectangle', (rect) => {

        socket.broadcast.emit('onrectangle', rect);

    });

    socket.on("rect-update", (data) => {
        socket.broadcast.emit("rect-update", data);
    });


    socket.on('circle', (circle) => {

        socket.broadcast.emit('oncircle', circle);

    });

      socket.on("circle-update", (data) => {
        socket.broadcast.emit("circle-update", data);
    });


    socket.on('arrow', (arrow) => {

        socket.broadcast.emit('onarrow', arrow);

    });

    socket.on("arrow-update",(data)=>{
        socket.broadcast.emit("arrow-update", data);
    })

    socket.on('scribble', (scribble) => {

        socket.broadcast.emit('onscribble', scribble);

    });

    socket.on("scribble-update", (data) => {
        socket.broadcast.emit("scribble-update", data);
    });

    socket.on("text",(data)=>{
        socket.broadcast.emit("ontext", data);
    });
})


app.get('/', (req, res) => {
    res.json({ message: "server is running" })
})


server.listen(3001, () => {
    console.log("server is running on port 3001");
})



