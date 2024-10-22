import Artist from '../models/artistModel.js'
import { scrapeTrackedArtist } from '../scrapers/trackedArtistsScraper.js'

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
        const artists = await Artist.find()
        res.status(200).json({message: 'Found artists:', artists})
        console.log('Successfully fetched artist data from DB')
    }
    catch (err) {
        console.log('Error fetching artists:', err)
        res.status(500).json({message: 'Error fetching artists'})
    }
}

export const updateConcerts = async(req, res) => {
    const { name } = req.body
    try {
        if (!name) {
            return res.status(400).json({message: 'No artist name entered'})
        }
        const updatedConcerts = await scrapeTrackedArtist(name)
        const artist = await Artist.findOneAndUpdate(
            { name: name },
            { concerts: updatedConcerts },
            { new: true }
        )
        if (artist) {
            res.status(200).json({message: 'Concerts updated for', artist: artist})
        }
        else {
            res.status(404).json({message: `Could not find ${artist} in db`})
        }
    }
    catch (err) {
        console.log('Error updating concerts:', err)
        res.status(500).json({message: 'Error updating concerts'})
    }
}
