const ArtistModel = require('../Models/ArtistModel');

const CollectionModel = require('../Models/CollectionModel');


const TopSearch = async (req, res) => {

    const { name } = req.params;
    
    const Data = await CollectionModel.find({title:{$regex:name,$options:'i'}});

    res.send(Data)

}

const SearchSong = async (req, res) => {

    const { name } = req.params;
    const url = `https://musicapi.x007.workers.dev/search?q=${name}&searchEngine=wunk`;
    const Data = await fetch(url).then((response) => response.json());
    res.send(Data?.response?Data?.response:[])

};

const searchAlbum = async (req, res) => {

    const { name: album } = req.params;

    const Albums = await CollectionModel.find({type:'Album',title:{$regex:album,$options:'i'}});
   
    res.send(Albums)

}

const SearchPlaylist = async (req, res) => {
    
    const { name: playlist } = req.params;

    const Playlists = await CollectionModel.find({type:'Playlist',title:{$regex:playlist,$options:'i'}});

    res.send(Playlists)

}

const SearchPackage = async (req, res) => {

    const { name: package } = req.params;
    const Packages = await CollectionModel.find({type:'package',title:{$regex:package,$options:'i'}});

    res.send(Packages)

}

const ArtistsByName = async (req, res) => {

    const { name: artist } = req.params;

    const Data = await ArtistModel.find({Name:{$regex:artist,$options:'i'}});

    res.send(Data?Data:[])
}

module.exports = {TopSearch,SearchSong,searchAlbum,SearchPlaylist,SearchPackage,ArtistsByName }