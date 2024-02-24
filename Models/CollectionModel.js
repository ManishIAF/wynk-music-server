const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    title: {type: String,required: true},
    type: {type: String,required: true},
    img: {type: String,required: true},
    language: {type: String},
    release_date: {type: Date},
    play_count: {type: Number},
    Song_Ids: [{type: mongoose.Schema.Types.ObjectId,ref:'Song',required: true}],
})

const Collection = mongoose.model('Collection',CollectionSchema);

module.exports = Collection;