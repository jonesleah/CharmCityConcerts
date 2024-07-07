import mongoose from 'mongoose'

const concertSchema = new mongoose.Schema({
    title: String,
    date: Date,
    location: String,
    ticketPrice: Number
})

const artistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    concerts: [concertSchema]
}, {timestamps: true})

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;