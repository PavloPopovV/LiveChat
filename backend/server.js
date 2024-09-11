import path from "path"
import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import router from './routes/index.js'
import { app, server } from './socket/socket.js';
import exp from "constants";

// const app = express();
const PORT = process.env.PORT || 5000

//deploy
const __dirname = path.resolve()
//---------
dotenv.config()
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api", router);

//deploy
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
//---------
server.listen(PORT, () => {
        connectToMongoDB()
    console.log(`Server work on port ${PORT}`)
});
