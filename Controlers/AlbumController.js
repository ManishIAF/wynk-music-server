const SongModel = require('../Models/SongModel');
const CollectionModel = require('../Models/CollectionModel');

const JustACall = async(req,res) => {
  const album = await CollectionModel.findOne({type:'Album'})
  res.send(album);
}

const albumById = async(req,res) => {
  
  const {id} = req.params;
  const album = await CollectionModel.findOne({type:'Album',_id:id}).populate('Song_Ids');

  res.send(album)
  
}

module.exports = {albumById,JustACall};