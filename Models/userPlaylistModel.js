const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserPlaylistSchema = new Schema({
  userId: { type: String, required: true },
  playlists: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      img: { type: String},
      createdAt: { type: Date,required: true},
      songIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }],
    },
  ],
});

const UserPlaylistModel = mongoose.model('userplaylist', UserPlaylistSchema);

module.exports = UserPlaylistModel;
