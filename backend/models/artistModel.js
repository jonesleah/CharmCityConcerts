import mongoose from 'mongoose'

const concertSchema = new mongoose.Schema({
    month: String,
    day: String,
    time: String,
    location: String,
    venue: String,
    title: String,
    ticketsLink: String
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