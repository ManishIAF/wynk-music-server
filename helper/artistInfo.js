const artistInfoByName = async(artistName)=>{

    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artistName}&api_key=402450bae5fe2eaf3c44a81d3c02868b&format=json`

    const artistInfo = await fetch(url).then((response) => response.json());

    let artistImage = null;

    if(artistInfo?.artist?.name){
        
        artistImage = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${artistName}&prop=pageimages&format=json&pithumbsize=300`)
                            .then((response) => response.json());
    }

    // const {name,mbid,stats:{listeners,playcount},bio:{summary}} = artistInfo?.artist;  

    const firstPageId = Object.keys(artistImage?.query?.pages)[0]
    // const Summary = summary?.split('<a')[0];
    return {
        id:artistInfo?.artist?.mbid,
        name:artistInfo?.artist?.name,
        listeners:artistInfo?.artist?.stats?.listeners,
        playcount:artistInfo?.artist?.stats?.playcount,
        Summary:artistInfo?.artist?.bio?.Summary?.split('<a')[0],
        img:artistImage?.query?.pages[firstPageId]?.thumbnail?.source
    };


}

module.exports = artistInfoByName;