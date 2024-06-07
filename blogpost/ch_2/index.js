// const express = require('express') // require express module
// const path = require('path')

// const app = express() // calls express function to start new Express app
// app.listen(3000, () => {
//     console.log("App listening on port 3000")
// })

// app.get('/', (req, res) => {
//     res.json({
//         name: 'Greg Lim'
//     })
// })

//Page 31: Serving static files with Express

const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/about', (req, res) => { // called when request to /about comes in
    res.sendFile(path.resolve(__dirname, 'about.html'))
})
app.get('/contact', (req, res) => { //called when request to /contact comes
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})