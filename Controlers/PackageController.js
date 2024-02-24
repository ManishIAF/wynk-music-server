const CollectionModel = require('../Models/CollectionModel');

const PackageByName = async(req,res) => {
    const {name} = req.params;
    const Data = await CollectionModel.findOne({type:'package',title:name}).populate('Song_Ids');
    res.send({img:Data?.img,title:Data?.title,type:Data?.type,_id:Data?._id,Data:Data?.Song_Ids})

}

const PackageById = async(req,res) => {
  
  const {id} = req.params;
  const playlist = await CollectionModel.findOne({type:'package',_id:id}).populate('Song_Ids');
  res.send({img:playlist?.img,title:playlist?.title,type:playlist?.type,_id:playlist?._id,Data:playlist?.Song_Ids});
  
}



module.exports = {PackageByName,PackageById};