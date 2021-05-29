const Router = require('express').Router()
const {updateWeather} = require('../controllers/weather');
Router.post('/updateWeatherData',(req,res)=>{
    updateWeather(req.con,res);
})
module.exports = Router