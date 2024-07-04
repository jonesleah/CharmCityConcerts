import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: "Taylor Swift"
    },
    concerts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'concert' 
    }]
});

const artist = mongoose.model('artist', artistSchema);
export default artist;