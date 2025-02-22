import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";




import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { io,app, server } from "./lib/socket.js";




dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  app.length("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist","index.html"));
    
  })

}



server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});