import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import router from "./routes/index.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;


const __dirname = path.resolve();

dotenv.config();
app.use(
  cors({
    origin: [
      "https://chat-app-prod-d0xl.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server work on port ${PORT}`);
});
