const express = require('express')
const app = express()
const books = require('./books.json')
const cors = require('cors')
app.use(cors())

// Middleware
app.use(express.json())

app.get('/books', (req,res) => {    
    res.status(200).json(books)
})

app.get('/books/:id', (req,res) => {    
    const id = parseInt(req.params.id)    
    const book = books.find(book => book.id === id)    
    res.status(200).json(book)
})

app.post('/books', (req,res) => {    
    console.log(req)
    books.push(req.body)    
    res.status(200).json(books)
})

app.put('/books/:id', (req,res) => {    
    const id = parseInt(req.params.id)    
    let book = books.find(book => book.id === id)    
    book.title = req.body.title,    
    book.author = req.body.author,    
    book.year = req.body.year,    
    res.status(200).json(book)
})

app.delete('/books/:id', (req,res) => {    
    const id = parseInt(req.params.id)    
    let book = books.find(book => book.id === id)    
    books.splice(books.indexOf(book),1)    
    res.status(200).json(books)
})

app.listen(8080, () => {    console.log("Serveur à l'écoute")})