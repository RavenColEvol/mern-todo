const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
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
app.use('/api/',require('./routes/todo.api'))
app.use('/api/users', require('./routes/users.api'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'../frontend/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'..','frontend','build','index.html'));
    });
}


app.listen(port)