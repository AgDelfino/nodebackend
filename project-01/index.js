const express = require('express')
const {connectMongoDB } = require('./connection')
const userRouter = require('./routes/user')
// const users = require('./MOCK_DATA.json'
const {urlencoded} = require("express");
const {logReqRes} = require('./middlewares')

const app = express()

// Constants:
const PORT = 8000
const DBURL = 'mongodb://localhost:27017/backend-app-1'

// Connection
connectMongoDB(DBURL).then(console.log('Mongo DB Connected!'))

// Middleware - Plugin
app.use(urlencoded({extended: false}))
app.use(logReqRes('log.txt'))

// Routes
app.use('/api/users', userRouter)


app.listen(PORT, ()=> {
    console.log(`Server Started at port: ${PORT}`)
})