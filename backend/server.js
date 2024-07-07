import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import artistRoutes from "./routes/artistRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500

app.use(cors())
app.use(express.json())

// Load and apply API route
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

