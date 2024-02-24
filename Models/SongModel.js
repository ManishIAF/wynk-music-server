const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    id: {required: true, type: String},
    title: {required: true, type: String},
    img: {required: true, type: String},
    artist: {required: true, type: Array},
    album: {required: true, type: String},
    album_id: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Collection'},
    duration: {required: true, type: String},
    Song_id: {type: String},
    Click_Through_Rate: {type: Number, default: 0},
    release_date: {type: Date},
    language: {type: String},
    genre: {type: Array},
    play_count: {type: Number, default: 0},
    musicCompany: {type: String},
    actor: {type: Array},
    lyrics_snippet: {type: String},
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;