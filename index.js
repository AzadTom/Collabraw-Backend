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

    socket.on("join-room", async (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-joined");
        const clients = await io.in(roomId).fetchSockets();
        if (clients.length >= 5) {
            socket.emit("room-full");
            return;
        }
        console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("rectangle", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("onrectangle", data.rectangle || data);
        } else {
            socket.broadcast.emit("onrectangle", data);
        }
    });

    socket.on("rect-update", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("rect-update", { id: data.id, props: data.props });
        } else {
            socket.broadcast.emit("rect-update", data);
        }
    });

    socket.on("circle", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("oncircle", data.circle || data);
        } else {
            socket.broadcast.emit("oncircle", data);
        }
    });

    socket.on("circle-update", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("circle-update", { id: data.id, props: data.props });
        } else {
            socket.broadcast.emit("circle-update", data);
        }
    });

    socket.on("arrow", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("onarrow", data.arrow || data);
        } else {
            socket.broadcast.emit("onarrow", data);
        }
    });

    socket.on("arrow-update", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("arrow-update", { id: data.id, props: data.props });
        } else {
            socket.broadcast.emit("arrow-update", data);
        }
    });

    socket.on("scribble", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("onscribble", data.scribble || data);
        } else {
            socket.broadcast.emit("onscribble", data);
        }
    });

    socket.on("scribble-update", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("scribble-update", { id: data.id, props: data.props });
        } else {
            socket.broadcast.emit("scribble-update", data);
        }
    });

    socket.on("text", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("ontext", data.textItem || data);
        } else {
            socket.broadcast.emit("ontext", data);
        }
    });

    socket.on("history-commit", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("history-commit", data.state || data);
        } else {
            socket.broadcast.emit("history-commit", data);
        }
    });

    socket.on("history-undo", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("history-undo");
        } else {
            socket.broadcast.emit("history-undo");
        }
    });

    socket.on("history-redo", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("history-redo");
        } else {
            socket.broadcast.emit("history-redo");
        }
    });

    socket.on("image-update", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("image-update", { id: data.id, props: data.props });
        } else {
            socket.broadcast.emit("image-update", data);
        }
    });

    socket.on("cursor:move", (data) => {
        if (data?.roomId) {
            socket.to(data.roomId).emit("cursor:move", data.cursor || data);
        } else {
            socket.broadcast.emit("cursor:move", data);
        }
    });

});

server.listen(3001, () => {
    console.log("server is running on port 3001");
})



