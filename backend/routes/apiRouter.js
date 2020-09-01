var express = require('express')
var router = express.Router()
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var WithAuth = require('./middleware')
var session = require('express-session') // 8월 28일 추가
const { json } = require('body-parser')
var moment = require('moment')

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
    .get((req, res, next) => {
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
                        const token = jwt.sign(payload, secret, {expiresIn : '1h'})
                        const localTime =  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
                        // req.session.cookie.expires = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
                        req.session.cookie.maxAge = 10000
                        res.cookie('token', token, {httpOnly:true, expires:new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)}).sendStatus(200)

                        console.log(localTime)
                        console.log(req.sessionID)
                        console.log(req.session)
                    }
               })
            }
        })
    })

router.route('/api/signout')
    .get(WithAuth, (req, res, next) => {
        res.clearCookie('token').sendStatus(200)
    })

router.route('/api/checkCookie')
    .get(WithAuth, (req, res, next) => {
        if(req.cookies.token && req.cookies.token.mberSn !== ""){
            res.send(req.session)
        } else {
            res.sendStatus(401)
        }
    })

router.route('/api/loginSession')
    .get((req, res, next) => {
        res.json(req.session)
        if(!req.session.num) {
            req.session.num = 1
        } else {
            req.session.num = req.session.num + 1
        }
        res.send(`Number : ${req.session.num}`)
    })



module.exports = router