var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var mongoose = require('mongoose')
var cors = require('cors')
var session = require('express-session')
var apiRouter = require('./routes/apiRouter')
var FileStore = require('session-file-store')(session);

require('dotenv').config()
var app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    name: 'Sessiontest',
    secret: 'seesionDog',
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        ttl: 180,
        reapInterval: 5 * 1000
    }),
    cookie: {
        expires: new Date(Date.now() - new Date().getTimezoneOffset() * 60000),
      }
}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err)
    else console.log('DB Connected')
})

app.use(cors())
app.use('/', apiRouter)

PORT=3001
app.listen(3001, () =>{
    console.log("Server is Starting")
})