const serverless = require('serverless-http');
const express = require('express');
const app = express();

require('dotenv').config()

const cors = require('cors');
const morgan = require('morgan')

const DB_Connection = require('./db/DB_Connection');

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('tiny')); 
app.disable('x-powered-by'); 

/******************************Calling Routes*********************************************/
const AuthenticateRoute = require('./Routes/AuthenticateRoute');
const UserPlaylistRoute = require('./Routes/UserPlaylistRoute');
const LoginRoute = require('./Routes/LoginRoute');
const ArtistsRoute = require('./Routes/ArtistRoute');
const AlbumRoute = require('./Routes/AlbumRoute');
const packageRoute = require('./Routes/Packageroute');
const PlaylistRoutes = require('./Routes/PlaylistRoutes');
const listRoutes = require('./Routes/listRoute') 
const SearchRoute = require('./Routes/SearchRoute');
/******************************************************************************************/


app.use(cors({
  origin:['http://localhost:3000',process.env.FR_URI],
  credentials: true,
  optionsSuccessStatus: 200,
  Headers:['Origin','X-Api-Key','X-Requested-With','Content-Type','Accept','Authorization']
}));

// const he = require('he');

//********************Package********************************** */
  app.use('/authenticate',AuthenticateRoute)

  app.use('/lists',listRoutes)

  app.use('/login',LoginRoute)

  app.use('/package',packageRoute);

  app.use('/playlist',PlaylistRoutes)

  app.use('/artists',ArtistsRoute);

  app.use("/album",AlbumRoute);

  app.use('/userplaylist',UserPlaylistRoute);

  app.use('/search',SearchRoute);
//************************************************************* */ 

app.listen(8000,()=>{
  DB_Connection().then((result)=>{
    console.log(result)
    console.log('server started')
  })
})

module.exports = app;