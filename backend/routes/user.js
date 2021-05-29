const Router = require('express').Router()
const User = require('../controllers/user');
Router.get('/userWeatherData', (req,res)=>{
    console.log("heer")
    User.getData(req.con,req.query.user_id,res)
   
})
Router.post('/registerUser', (req,res)=>{

    User.createUser(req.body.user,req.con,res)
})
Router.post('/setUserPreferences', (req,res)=>{

    User.setPreference(req.con,req.body.city_codes,req.body.user_id,res)
})
module.exports = Router