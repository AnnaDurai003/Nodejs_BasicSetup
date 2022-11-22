const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')


const errorHandler = require('./middleware/indexMiddleware')

const app = express()


//sanitize data
app.use(mongoSanitize())

//Set security headers
app.use(helmet())

//Prevent XSS attack
app.use(xss())

//Rate limiting for request
const limiter = rateLimit({
  windowMs : 10 * 60 * 1000, //10 minutes
  max:100
})

app.use(limiter);

//prevent http param pollution
app.use(hpp())

//cookie parser
app.use(cookieParser())

//routes
app.get('/',(req,res,next)=>{
  res.json({success:true})
})


//error handler 
app.use(errorHandler.errorHandler)

app.listen(3000,'0.0.0.0',()=>{
  console.log(`server running on http://localhost:${process.env.PORT}`)
})