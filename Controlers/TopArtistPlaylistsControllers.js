const TopArtists = require('../Data/TopArtists/TopArtists')

const TopArtistsPlaylists = async(req,res) => {
    
    const {singer} = req.params

    const apiKey = "402450bae5fe2eaf3c44a81d3c02868b";
    const artist = singer;

    const url = `https://musicapi.x007.workers.dev/search?q=${artist}&searchEngine=wunk`;

    const Info = TopArtists?.find(item => item.Name === singer)

    const songsData = await fetch(url).then((response) => response.json());

    const songs = await Promise.all(songsData?.response?.map(async (song) => {

      const track = song?.title;

      const url2 = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`;
      const trackInfo = await fetch(url2).then((response) => response.json());
      const Artist = trackInfo?.track?.album?.artist?.split(/, | & /).map(artist => artist.trim());
      const {id,img,title} = song;
      return {id,img,title,duration:trackInfo?.track?.duration,artist:[...new Set([artist,...(Artist || [])])],album:trackInfo?.track?.album?.title ? trackInfo?.track?.album?.title : track};
      
    }));

    res.send({Info,Data:songs})

}


module.exports = TopArtistsPlaylists