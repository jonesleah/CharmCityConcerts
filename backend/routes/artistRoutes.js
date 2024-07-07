import express from 'express'
import { addArtist } from '../controllers/artistController.js'
const router = express.Router()

router.post('/add-artist', addArtist)
export default router