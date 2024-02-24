const artistInfoByName = require('../helper/artistInfo');
const ArtistModel = require('../Models/ArtistModel');
const ListsModel = require('../Models/ListsModel');

const artistByGenre = async(req,res)=>{
    const {title} = req.params;
    const artistIds = await ListsModel.findOne({title:title});
    const artists = await ArtistModel.find({_id:{$in:artistIds?.Ids}});

    res.send({_id:artistIds?._id,title:artistIds?.title,Data:artists});
}

const ArtistsById = async(req,res)=>{
  try{
    const {id} = req.params;
    const artistInfo = await ListsModel.findOne({_id:id});
    const artists = await ArtistModel.find({_id:{$in:artistInfo?.Ids}});
    res.send({_id:artistInfo?._id,title:artistInfo?.title,Data:artists});
  }catch(err){
    res.send(err.message)
  }
}

const artistinfo = async(req,res)=>{

    const {name} = req.params;
    let artistInfo = '';

    const fountArtist = await ArtistModel.findOne({Name:name});

    if(fountArtist){
      artistInfo = fountArtist;
    }

    if(!fountArtist){
      artistInfo = await artistInfoByName(name);
    }

    res.send(artistInfo);
    
}
  

const ArtistSongs = async(req,res)=>{

    try {
      const {name} = req.params;

      const apiKey = "402450bae5fe2eaf3c44a81d3c02868b";
      const artist = name;
  
      const url = `https://musicapi.x007.workers.dev/search?q=${artist}&searchEngine=wunk`;
  
      const songsData = await fetch(url).then((response) => response.json());
  
      const songs = await Promise.all(songsData?.response?.map(async (song) => {
  
        const track = song?.title;
  
        const url2 = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`;

        const trackInfo = await fetch(url2).then((response) => response.json());
        let inputDuration = +trackInfo?.track?.duration/1000;
      
        let Duration = 0;

        if(inputDuration === 0 || inputDuration ===  NaN){
          let seconds = Math.floor(Math.random() * 60);
          Duration = `3:${seconds < 10 ? `0${seconds}` : `${seconds}`}`
        }
        if(inputDuration > 0){
          console.log('track duration : ',inputDuration)

          let minutes = Math.floor(inputDuration / 60);

          let seconds = inputDuration % 60;

          let formattedMinutes = `${minutes}`;
          let formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
          Duration = `${formattedMinutes}:${formattedSeconds}`;
        }
        
        const Artist = trackInfo?.track?.album?.artist?.split(/, | & /).map(artist => artist?.trim());
        
        const {id,img,title} = song;
        
        return {id,img,title,duration:Duration,artist:[...new Set([artist,...(Artist || [])])],album:trackInfo?.track?.album?.title ? trackInfo?.track?.album?.title : track};
        
      }));
      res.send(songs)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
      
  }

  module.exports = {artistByGenre,ArtistsById,artistinfo,ArtistSongs}