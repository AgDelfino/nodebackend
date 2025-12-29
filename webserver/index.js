const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req,res) => {
    return res.send(
        'Hello from HomePage'
    )
})

app.get('/about', (req, res) => {
    if(!req.query.name) return res.send('What about you')
    return res.send(`This is all about ${req.query.name}`)
})

app.listen(8000, () => console.log('Listening on port 8000'))

/*
const myServer = http.createServer(app)
myServer.listen(8000, () => console.log('Listening!'))*/
