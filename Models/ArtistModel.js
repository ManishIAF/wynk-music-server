const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    Name: {type: String,required: true},
    title: {type: String},
    type: {type: String,required: true},
    genre:[{type: String}],
    play_count: {type: Number},
    img: {type: String},
    about:String,
    followers: {type: Number},
})

const ArtistModel = mongoose.model('Artist',ArtistSchema);

module.exports = ArtistModel;