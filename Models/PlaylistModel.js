const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    title: {type: String,required: true},
    img: {type: String,required: true},
    Song_Ids: [{type:Array,required: true}],
    type: {type: String,required: true},
})

const Playlist = mongoose.model('Playlist',PlaylistSchema);

module.exports = Playlist;