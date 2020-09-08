var session = require('express-session')

const sessLogout = (req, res, next) =>{
    const reqSess = req.session.cookie.expires

    if(reqSess === Date.now){
        console.log(err)
    }else{

        
    }
}