const http = require('http')
const fs = require('fs')
const url= require('url')

// All this code it's Vanilla JS, so we are going
// to have another index to apply Express with Node!

const serverHandler = (req, res) => {
    if(req.url === '/favicon.ico') return res.end()

    const log = `Date: ${Date.now()} / ${req.method} / ${req.url} --> Request Received`

    const myUrl = url.parse(req.url, true)
    fs.appendFile('log.txt', log, () => {
        switch (myUrl.pathname) {
            case '/': res.end('Hello HomePage')
                break
            case '/about':
                const userName = myUrl.query.username
                if(!userName) return res.end('What about you!')
                res.end(`Hello there ${userName} !`)
                break
            case '/contact': res.end('Contact Agus!')
                break
            case '/search':
                const searchQuery = myUrl.query.search
                res.end(`Here is the result of your search: ${searchQuery}`)
                break
            default: res.end('404 Not Found!')
        }
    })
}

const myServer = http.createServer(serverHandler)

myServer.listen(8000, () => {
    console.log(`Listening on port ${8000}`)
})

