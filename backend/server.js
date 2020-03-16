const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const passport = require('passport')

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

require('./config/passport')(passport)

const uri = process.env.DB;
mongoose.connect(uri, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongodb connection')
})

// API Routes
app.use('',require('./routes/todo.api'))
app.use('/api/users', require('./routes/users.api'))


app.listen(port)