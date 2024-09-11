import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import router from './routes/index.js'
import { app, server } from './socket/socket.js';

// const app = express();
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api", router);

server.listen(PORT, () => {
        connectToMongoDB()
    console.log(`Server work on port ${PORT}`)
});
