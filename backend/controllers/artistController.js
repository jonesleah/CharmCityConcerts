import Artist from '../models/artistModel.js'
import { scrapeTrackedArtists } from '../scrapers/trackedArtistsScraper.js'

export const addArtist = async(req, res) => {
    const {name} = req.body

    try {
        if (!name) {
            return res.status(400).json({message: 'No artist name entered'})
        }
        const concertsData = await scrapeTrackedArtists(name)
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
