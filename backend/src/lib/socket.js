import {Server} from "socket.io";
import http from 'http'
import express from "express";

const app=express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});
export function getRecieverSocketId(userId) {
    return userSocketMap[userId];

    
}
const userSocketMap = {}; //{userId:socket}
io.on("connection", (socket) => {
    setTimeout(()=>{
            console.log("a user connnected",socket.id);

    });

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;
    //io.emit() is used to send events to all online users
    io.emit("getOnlineUsers",Object.keys(userSocketMap));





    socket.on("disconnect", () => {
        console.log("a user disconnected",socket.id);
        delete userSocketMap[userId];


    })
});
export {io,app,server};