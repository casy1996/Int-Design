//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
const port = process.env.PORT || 4000;
// const mongoURI = 'mongodb://127.0.0.1:27017/gallery'

//MODELS
const seedData = require('./models/seed.js')

//MMIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


//MongoDB CONNECTION
// async function connectToMongo() {
//     try {
//         await mongoose.connect(mongoURI)
//         console.log(`Connected to MongoDB!`)
//     } catch (error) {
//         console.error(error)
//     }
// }
// connectToMongo();

//INDEX
app.get("/gallery", (req,res)=> {
    // res.send(seedData)
    res.render("index.ejs", {
        seedData: seedData,
    })
});

//NEW
app.get("/gallery/new", (req, res)=> {
    // res.send(`new route`)
    res.render("new.ejs")
});

//DELETE

//UPDATE

//CREATE
app.post("/gallery", (req, res)=> {
    console.log(req.body)
    seedData.push(req.body);
    res.redirect("/gallery")
});

//EDIT
app.get('/gallery/:id/edit', (req, res)=> {
    res.render("edit.ejs", {
        seedData: seedData[req.params.id],
    })
})

//SHOW
app.get("/gallery/:id", (req, res)=> {
    // res.send(`show route`)
    res.render("show.ejs", {
        seedData: seedData[req.params.id],
        index: req.params.id,
    })
});

//EXPRESS WEB SERVER
app.listen(port, ()=>{
    console.log(`App is running on ${port}`)
});