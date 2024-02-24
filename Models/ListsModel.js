const mongoose = require('mongoose');


const ListsSchema = new mongoose.Schema({
    title: {type: String,required: true},
    Ids:[{type:mongoose.Schema.Types.ObjectId,ref:'Collection',required: true}],
});



const Lists = mongoose.model('List',ListsSchema);

module.exports = Lists;

//****************************************************************************** */