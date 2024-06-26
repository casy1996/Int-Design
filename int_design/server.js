//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const galleryController = require("./controllers/gallery.js")
const favoriteController = require("./controllers/favorites.js")


//CONFIGURATION
// const mongoURI = 'mongodb://127.0.0.1:27017/gallery'
const mongoURI = process.env.MONGOURI

//MMIDDLEWARE
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(galleryController)
app.use(favoriteController)

//MongoDB CONNECTION
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB!")
    } catch (error) {
        console.error(error)
    }
}
connectToMongo();

//EXPRESS WEB SERVER
app.listen(port, ()=>{
    console.log(`App is running on ${port}`)
});