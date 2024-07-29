import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import artistRoutes from "./routes/artistRoutes.js"

dotenv.config()
mongoose.set('debug', true)
const app = express()
const PORT = process.env.PORT || 3000

app.use('/screenshots', express.static(path.join('/tmp')));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://charmcityconcerts.onrender.com"]
    })
)
app.use(express.json())

// Load and apply API routes
app.use('/api', artistRoutes)

const db = async() => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URL)
        console.log('DB Connected')
    }
    catch (err) {
        console.log('DB Connection error:', err)
    }
}

// Connect to database and server
db()
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

