//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const mongoURI = 'mongodb://127.0.0.1:27017/gallery'

//MODELS
const seedData = require('./models/seed.js')

//MIDDLEWARE

//MongoDB CONNECTION
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI)
        console.log(`Connected to MongoDB!`)
    } catch (error) {
        console.error(error)
    }
}
connectToMongo();

//INDEX
app.get('/gallery', (req,res)=> {
    // res.send(seedData)
    res.render("index.ejs", {
        seedData: seedData,
    })
});

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW

//EXPRESS WEB SERVER
app.listen(port, ()=>{
    console.log(`App is running on ${port}`)
});