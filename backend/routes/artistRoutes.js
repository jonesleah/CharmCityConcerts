import express from 'express'
import {addArtist, getArtistData, updateConcerts} from '../controllers/artistController.js'
const router = express.Router()

router.post('/add-artist', addArtist)
    .get('/get-artists', getArtistData)
    .put('/update-concerts', updateConcerts)
export default router