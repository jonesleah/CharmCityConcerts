import express from 'express'
import {addArtist, getArtistData} from '../controllers/artistController.js'
const router = express.Router()

router.post('/add-artist', addArtist)
router.post('/get-artists', getArtistData)
export default router