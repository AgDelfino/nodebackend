const express = require('express')
const fs = require('fs')
const PORT = 8000
const users = require('./MOCK_DATA.json')
const {urlencoded} = require("express");

const app = express()
// Middleware - Plugin
app.use(urlencoded({extended: false}))

app.use((req, res, next) => {
    fs.appendFile('log.txt', `Date: ${Date.now()} Method: ${req.method} Path: ${req.path} IP${req.ip}\n`, (err, data) => {
        next()
    })
})

// REST API
app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find(user => user.id === id)
        if(!user){
            return res.status(404).json({error: 'User not found'})
        }
        return res.json(user)
    })
    .patch((req, res) => {
        const id = Number(req.params.id)
        const body = req.body
        const userIndex = users.findIndex(user => user.id === id);
        const updatedUser = {...users[userIndex], ...body}
        if (userIndex === -1) {
            return res.status(404).json({error: 'User does not exist'})
        }
        console.log(userIndex)

        users[userIndex] = updatedUser
        console.log('USER: ', users[userIndex])

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err){
                return res.status(500).json({error: err})
            }
            return res.status(200).json({status: 'modified', user: updatedUser})
        })
    })
    .delete((req, res) => {
      const id = Number(req.params.id);
      const userIndex = users.findIndex(user => user.id === id);
      if(userIndex === -1){
          return res.status(404).json({error: "User does not exist"})
      }
      const newUsers = users.splice(userIndex, 1);
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err, data) => {
          if (err){
              return res.status(500).json({error: 'User does not exist'})
          }
          return res.status(200).json({status: 'deleted'})
      })
    })

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length})
    })
})


// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    return res.send(html)
})


app.listen(PORT, ()=> {
    console.log(`Server Started at port: ${PORT}`)
})