# 🚀 Collabraw Backend

Backend server for **Collabraw**, a real-time collaborative whiteboard application. This server manages WebSocket connections, synchronizes drawing events between connected users, and powers real-time collaboration using **Socket.io**.

> This repository contains only the backend. For the client application, see the Frontend Repository linked below.

<p align="center">
  <img src="https://github.com/user-attachments/assets/010d137d-f9f9-4fb2-b998-db0a54b8dca1" alt="Collabraw Banner" width="900">
</p>

<p align="center">
  <a href="https://youtu.be/WM2ciy3OO80?si=CpHmKjQ5eJZEeavZ">
    <img src="https://img.shields.io/badge/▶%20Watch-Demo-red?style=for-the-badge&logo=youtube" alt="Watch Demo">
  </a>
</p>

---

## ✨ Features

* ⚡ Real-time communication with Socket.io
* 👥 Multi-user collaboration
* 🏠 Automatic room creation and management
* 📝 Name-based user identification
* 👥 Maximum of **5 users per room**
* 📡 Low-latency event broadcasting
* ✏️ Real-time synchronization of drawing operations
* 🔤 Real-time text synchronization
* 🔲 Shape creation and updates
* 🧹 Eraser synchronization
* 🔄 User join and leave handling
* 📈 Lightweight and scalable architecture

---

## 🔄 How It Works

1. A user opens the application and enters their name.
2. The frontend establishes a **Socket.io** connection with the backend.
3. The backend creates a collaboration room or joins the user to an existing one.
4. Each room supports **up to 5 active users** at a time.
5. Every drawing action, shape update, text edit, erase operation, undo, and redo event is instantly broadcast to all connected users in the same room.
6. When a user joins or leaves, the room state is updated in real time so every participant stays synchronized.

> **Room Limit:** Each collaboration room allows a maximum of **5 participants**. Additional users must wait until space becomes available.

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Real-Time Communication

* Socket.io

### Development

* Nodemon
* ts-node

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/AzadTom/Collabraw-Backend.git

cd Collabraw-Backend
```

### Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Update `CLIENT_URL` if your frontend runs on a different origin.

---

### Start the development server

```bash
npm run dev
```

The server will start at:

```text
http://localhost:5000
```

---

## 📂 Project Structure

```text
Collabraw-Backend
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── sockets/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── .env
├── package.json
└── README.md
```

> Update the folder structure if your project differs.

---

## 📡 Socket Events

### Client → Server

* Join Room
* Leave Room
* Draw
* Update Shape
* Delete Shape
* Add Text
* Cursor Move
* Undo
* Redo

### Server → Client

* User Joined
* User Left
* Canvas Updated
* Cursor Updated
* Room Synced

---

## 🚀 Future Improvements

* [ ] Persistent whiteboard storage
* [ ] Authentication & Authorization
* [ ] Room invitations
* [ ] Cursor names & avatars
* [ ] Redis adapter for horizontal scaling
* [ ] Rate limiting
* [ ] Presence indicators
* [ ] Whiteboard version history
* [ ] API documentation
* [ ] Docker support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add my feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

## 🔗 Frontend Repository

This backend powers the **Collabraw** frontend application.

**Frontend Repository:**
👉 https://github.com/AzadTom/Collabraw

**Frontend live link:**
👉 [https://white-board-front-end.vercel.app/](https://white-board-front-end.vercel.app/)

---

## ⭐ Show Your Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps others discover the project and supports future development.
