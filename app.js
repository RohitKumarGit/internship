const mysql = require('mysql');
const weatherRouter = require('./backend/routes/weather')
const express  = require('express')
const app = express()
const userRouter = require('./backend/routes/user')
const bp = require('body-parser')
app.use(bp.json())
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  'port':process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: 'internship'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.use((req,res,next)=>{
  req.con = connection
  next()
})


app.use('/api',userRouter)
app.use('/api',weatherRouter)

app.listen(8085,function(err,res){
  if(err){
    console.log(err)
  }
  else {
    console.log("server running!")
  }
})
