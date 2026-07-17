import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import upload from './routes/upload.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/upload", upload);

app.get('/', (req, res) => {
    res.json({ message: "server is running" })
});

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

    socket.on("arrow-update", (data) => {
        socket.broadcast.emit("arrow-update", data);
    })

    socket.on('scribble', (scribble) => {

        socket.broadcast.emit('onscribble', scribble);

    });

    socket.on("scribble-update", (data) => {
        socket.broadcast.emit("scribble-update", data);
    });

    socket.on("text", (data) => {
        socket.broadcast.emit("ontext", data);
    });

    socket.on("history-commit", (data) => {
        socket.broadcast.emit("history-commit", data);
    });

    socket.on("history-undo", () => {
        socket.broadcast.emit("history-undo");
    });

    socket.on("history-redo", () => {
        socket.broadcast.emit("history-redo");
    });


    socket.on("image-update", (data) => {
        socket.broadcast.emit("image-update", data);
    });

    socket.on("cursor:move", (cursor) => {
        socket.broadcast.emit("cursor:move", cursor);
    });


})

server.listen(3001, () => {
    console.log("server is running on port 3001");
})



