import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import router from './routes/index.js'

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use("/api", router);

app.listen(PORT, () => {
        connectToMongoDB()
    console.log(`Server work on port ${PORT}`)
});
