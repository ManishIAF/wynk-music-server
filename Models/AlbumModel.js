const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: {type: String,required: true},
    type: {type: String,required: true},
    img: {type: String,required: true},
    language: {type: String,required: true},
    release_date: {type: Date,default:Date.now,required: true},
    play_count: {type: Number,required: true},
    Song_Ids: [{type: mongoose.Schema.Types.ObjectId,ref:'Song',required: true}],
})

const Album = mongoose.model('Album',AlbumSchema);

module.exports = Album;