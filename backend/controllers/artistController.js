import Artist from '../models/artistModel.js'
import {scrapeTrackedArtist} from '../scrapers/trackedArtistsScraper.js'

export const addArtist = async(req, res) => {
    const {name} = req.body

    try {
        if (!name) {
            return res.status(400).json({message: 'No artist name entered'})
        }
        const concertsData = await scrapeTrackedArtist(name)
        const newArtist = new Artist({
            name,
            concerts: concertsData
        })
        await newArtist.save()
        res.status(200).json({message: 'Successfully added', artist: newArtist})
    }

    catch (err) {
        console.log('Error adding artist:', err)
        res.status(500).json({message: 'Error adding artist'})
    }
}

export const getArtistData = async(req, res) => {
    try {
        const artistData = await Artist.find()
        res.status(200).json(art)
    }
    catch (err) {
        console.log('Error fetching artists:', err)
        res.status(500).json({message: 'Error fetching artists'})
    }
}
