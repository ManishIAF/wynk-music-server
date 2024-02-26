const userPlaylistModel = require("../Models/userPlaylistModel")

const getUserPlaylist = async(req,res)=>{
    const {_id} = req.User;

    const Data = await userPlaylistModel.findOne({userId:_id});
console.log(Data);
    res.send(Data?.playlists);
}

const SaveUserPlaylist = async(req,res)=>{
    
    const {_id} = req.User;

    const playlists = await userPlaylistModel.findOne({userId:_id});

    if(!playlists){
    
        const newUserPlaylist = new userPlaylistModel(
            {
                userId:_id,
                playlists:[
                    {
                        title: req?.body?.name,
                        type: req.body.name === 'Liked Songs' ? 'my-music':'my-music/my-playlists',
                        img: req?.body?.songs[0]?.img,
                        createdAt: Date.now(),
                        songIds: req.body?.songs.map((song)=>song?._id),
                    },
                ]
            }
        )
        const ggg = await newUserPlaylist.save();
       res.send(ggg);
    }

    if(playlists){
        const playlistExist = playlists?.playlists?.find((playlist)=>playlist?.title === req?.body?.name);

        if(playlistExist){
            const result = await userPlaylistModel.updateOne(
                {
                userId: _id,
                "playlists.title": req?.body?.name,
                },
                {
                    $addToSet: {
                        "playlists.$.songIds": {
                            $each: req.body?.songs.map((song)=>song?._id),
                        },
                    },
                }
            );
            res.send(result);
        }
        if(!playlistExist){
            const result = await userPlaylistModel.updateOne(
                {userId:_id},
                {
                    $push: {
                        playlists: {
                            title: req?.body?.name,
                            type: req.body.name === 'Liked Songs' ? 'my-music':'my-music/my-playlists',
                            img: req?.body?.songs[0]?.img,
                            createdAt: Date.now(),
                            songIds: req.body?.songs.map((song)=>song?._id),
                        },
                    },
                }
            );
            res.send(result);
        }
    }
}

const removefromPlaylist = async (req, res) => {
    const { _id } = req.User;
    const { name } = req.query;

    const songIdsToRemove = req.body?.songs.map((song) => song?._id);

    const result = await userPlaylistModel.updateOne(
        {
            userId: _id,
            "playlists.title": name
        },
        {
            $pull: {
                "playlists.$.songIds": { $in: songIdsToRemove }
            },
        }
    );

    res.send(result);
};


const UserplaylistByName = async(req,res)=>{
    const {_id} = req.User;

    const {name} = req.params;


    const Data = await userPlaylistModel.findOne(
        {
            userId:_id,
            "playlists.title":name
        },
        {
            "playlists.$": 1,
        }
    ).populate('playlists.songIds');

    res.send(Data?.playlists[0]);
}

const UserPlaylistById = async(req,res) => {
    const {_id:userId} = req.User;
    const {id:playlist_id} = req.params;

    const Data = await userPlaylistModel.findOne(
        {
            userId:userId,
            "playlists._id":playlist_id
        },
        {
            "playlists.$": 1,
        }
    ).populate('playlists.songIds');

    res.send(Data?.playlists[0]);

}


module.exports = {getUserPlaylist,SaveUserPlaylist,UserplaylistByName,UserPlaylistById,removefromPlaylist};