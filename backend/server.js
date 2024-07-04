import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { readdirSync } from "fs"
import router from "./routes/artistRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500

app.use(cors())
app.use(express.json())
//app.use(express.static(path.join(__dirname, 'frontend', 'public')))


// Load and apply all routes
const routes = readdirSync('./routes')
routes.forEach(async (route) => {
    const routeModule = await import(`./routes/${route}`);
    app.use('/api/v1', routeModule.default);
})

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

