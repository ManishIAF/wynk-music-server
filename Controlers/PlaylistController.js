const CollectionModel = require('../Models/CollectionModel');


const PlaylistById = async(req,res) => {
  
    const {id} = req.params;
    const playlist = await CollectionModel.findOne({_id:id}).populate('Song_Ids');
    res.send({Data:playlist?.Song_Ids,img:playlist?.img,title:playlist?.title,type:playlist?.type,_id:playlist?._id})
    
}



module.exports = {PlaylistById};