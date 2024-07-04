import artist from '../models/artistModel.js'
import concert from '..models/concertModel.js'

export const addArtist = async(req, res) => {
    const {name} = req.body
    try {
        if (!name) {
            return res.status(400).json({message: 'No artist name entered'})
        }
        const newArtist = new artist({name})
        await newArtist.save()
        res.status(200).json({message: 'Successfully added artist!'})
    }
    catch (err) {
        res.status(500).json({message: 'Error adding artist'})
    }
}
