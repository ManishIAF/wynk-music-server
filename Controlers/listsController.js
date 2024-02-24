const listsModel = require('../Models/ListsModel')

const listsByName = async(req,res) => {
    const list = await listsModel.findOne({title:req.params.name}).populate('Ids').exec();
    res.send({Data:list?.Ids,Title:list?.title,_id:list?._id})
}

const listsById = async(req,res) => {
    try{
        
        const list = await listsModel.findOne({_id:req?.params?.id}).populate('Ids');
        res.send({_id:list?._id,Title:list?.title,Data : list?.Ids})

    }catch(e){
        console.log('Error found')
    }
}

module.exports = {listsByName,listsById}