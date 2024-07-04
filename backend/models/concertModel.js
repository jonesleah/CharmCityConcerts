import mongoose from 'mongoose'

const concertSchema = new mongoose.Schema({
    artist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'artist', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    venue: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    ticketPrice: {
        type: Number,
        required: false
    }
})

const concert = mongoose.model('concert', concertSchema)
export default concert

