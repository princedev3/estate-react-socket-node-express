
"use strict";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

let onLineUser = [];

const addUser = (userId, socketId) => {
  const existingUser = onLineUser.find(user => user.userId === userId);

  if (!existingUser) {
    onLineUser.push({ userId, socketId });
   
  } 
  
};



const removeUser = (socketId) => {
  onLineUser = onLineUser.filter(user => user.socketId !== socketId);


};

const getUser = (userId) => {
  return onLineUser.find(user => user.userId === userId);
};

io.on("connection", (socket) => {
 

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ recieverId, data }) => {
   
    const reciever = getUser(recieverId);
    if (reciever) {
    
      io.to(reciever.socketId).emit("getMessage", data);
    } 
  });

  socket.on("disconnect", () => {
    
    removeUser(socket.id);
  });
});  

io.listen(4000);

