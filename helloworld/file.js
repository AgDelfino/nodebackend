const fs = require('fs')
const os = require('os')

console.log(os.cpus().length) // Max thread size

// Examples of blocking and non-blocking calls.

fs.writeFileSync('./file.txt', `Welcome Home`)

fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    console.log(data)
})

console.log(1)
console.log(2)
console.log(3)


module.exports = {
    fs
}