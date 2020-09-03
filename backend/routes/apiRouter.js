var express = require('express')
var router = express.Router()
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var WithAuth = require('./middleware')
var session = require('express-session')
const { json } = require('body-parser')
var FileStore = require('session-file-store')(session)
var fs = require('fs')
var path = require('path')

const secret = "mysecrethhhhhh"

router.route('/api/home')
    .get((req, res, next) => {
        res.json({
            message:"Hello",
            name:"Choi"
        })
    })

var mockData = {
    carNum: 1000,
    brand : 'KIA',
    model : '2020 Sorento',
    owner : 'JungHyeokChoi',
    img : 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-kia-sorento-mmp-1-1572468419.jpg?crop=0.752xw:0.846xh;0.170xw,0.154xh&resize=768:*'
}

router.route('/api/items')
    .get(WithAuth, (req, res, next) => {
        res.json(mockData)
    })

router.route('/api/signup') 
    .post((req, res ,next) => {
        const {email, password, username} = req.body
        const user = new User({email, password, username})
        
        user.save((err) => {
            if(err){
                console.log(err)
                res.status(500).send("Error signup new user please try again")
            } else {
                res.status(200).send("Sign Up is Success")
            }
        })
    })

router.route('/api/signin')
    .post((req, res, next) => {
        const {email, password} = req.body

        User.findOne({email}, (err, result) =>{ 
            if(err) {
                console.log(err)
                res.status(500).json({error : 'Internal error please try again'})
            } else if(!result) {
                console.log(result)
                res.status(401).json({error : 'This user not exist. please using after sign up'})   
            } else {
               result.isCorrectPassword(password, (err, same) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({error : 'Internal error please try again'})
                    } else if (!same) { 
                        res.status(401).json({error : 'Incorrect password'})
                    } else {
                        const payload = {email}
                        const token = jwt.sign(payload, secret, {expiresIn: '1h'})
                        res.cookie('token', token).sendStatus(200)

                        // var localTime = Date.now() - new Date().getTimezoneOffset() * 60000
                        // var limitTime = 10 * 1000
                        // req.session.cookie.expires = new Date(localTime + limitTime)
                        req.session.cookie.httpOnly = true

                        console.log(req.session)
                        console.log(req.sessionID)
                    }
               })
            }
        })
    })

router.route('/api/signout')
    .get(WithAuth, (req, res, next) => {
        var Sesspath = path.resolve(__dirname, req.sessionID + '.json')
        res.clearCookie('token').sendStatus(200)
        req.session.destroy((err)=>{
            if(err) {
                console.log(err)
            } else {
                req.sessionID = null
                console.log(req.session)
                console.log(req.sessionID)
                fs.readFile(Sesspath, ()=>{
                    FileStore.prototype.destroy()
                })
            }
        })
    })

router.route('/api/checkCookie')
    .get(WithAuth, (req, res, next) => {
        if(req.cookies.token && req.cookies.token.mberSn !== ""){
            res.send(req.session)
        } else {
            res.sendStatus(401)
        }
    })

module.exports = router