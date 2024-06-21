//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
const port = process.env.PORT || 4000;

//CONFIGURATION
const mongoURI = 'mongodb://127.0.0.1:27017/gallery'

//MODELS
const Gallery = require('./models/gallery.js')
const seedData = require('./models/seed.js')

//MMIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


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

//DEFAULT DATA FOR DB

// const defaultItems = [
//     {
//         name: 'Orb Sofa',
//         price: 3578,
//         image: 'https://i.postimg.cc/RqrBBnz5/IMG-4104-auto-x2-ca48ad6e-c001-475c-a32b-87611201a6fb.jpg',
//         description: 'Statement chair to draw interest into any space. Bubble cushions bring a welcoming cozy feel',
//         tags: ['statement','sofa','chair','bubble'],
//     },
//     {
//         name: 'Ettore Sottsass Mirror',
//         price: 999,
//         image: 'https://i.postimg.cc/5yQXgvmZ/decorative-objects-floor-mirrors-1970-1979-mid-century-modern-poltronova-living-in-style-gallery-273.jpg',
//         description: 'Viral wavey standing mirror. Fill your space with the soft glow from the LED frame.',
//         tags: ['statement','bold','backlit','retro','mirror'],
//     },
//     {
//         name: 'Lego Coffee Table',
//         price: 500,
//         image: 'https://i.postimg.cc/FR7btYZx/ff9b636f8bae5fd9655b6b67f01eacb1.jpg',
//         description: 'Homemade coffee table with base made of Lego drawers. Heavy glass table top.',
//         tags: ['lego','table','colorful'],
//     }
// ]

// async function insertDefaultToGallery(defaultItems) {
//     try {
//        const baseGallery = await Gallery.insertMany(defaultItems);
//        console.log(baseGallery)
//     } catch (err) {
//         console.error(err)
//     } finally {
//         mongoose.connection.close();
//     }
// }

// insertDefaultToGallery(defaultItems)


//INDEX
app.get("/gallery", async (req,res)=> {
    // res.send(seedData)
    // res.render("index.ejs", {
    //     seedData: seedData,
    // })
    try {
        const showAll = await Gallery.find({})
        // console.log(showAll)
        res.render("index.ejs", {
            gallery: showAll,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

//NEW
app.get("/gallery/new", (req, res)=> {
    // res.send(`new route`)
    res.render("new.ejs")
});

//DELETE
app.delete("/gallery/:id", async (req, res)=> {
    // gallery.splice(req.params.id, 1)
    // res.redirect("/gallery")
    try {
        await Gallery.findByIdAndDelete(req.params.id)
        res.redirect("/gallery")
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

//UPDATE
app.put("/gallery/:id", async (req, res)=> {
    // seedData[req.params.id] = req.body
    // res.redirect("/gallery")
    try {
        let updatedItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true});
        console.log(updatedItem)
        res.redirect("/gallery")
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

//CREATE
app.post("/gallery", async (req, res)=> {
    // console.log(req.body)
    // seedData.push(req.body);
    // res.redirect("/gallery")
    try {
        await Gallery.create(req.body)
        // console.log(req.body)
        res.redirect("/gallery")
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

//EDIT
app.get("/gallery/:id/edit", async (req, res)=> {
    // res.render("edit.ejs", {
    //     seedData: seedData[req.params.id],
    //     index: req.params.id,
    // })
    try {
        const editItem = await Gallery.findById(req.params.id)
        res.render("edit.ejs", {
            gallery: editItem,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

//SHOW
app.get("/gallery/:id", async (req, res)=> {
    // res.send(`show route`)
    // res.render("show.ejs", {
    //     seedData: seedData[req.params.id],
    //     index: req.params.id,
    // })
    try {
        const singleItem = await Gallery.findById(req.params.id)
        // console.log(singleItem);
        // res.send(singleItem);
        res.render("show.ejs", {
            gallery: singleItem,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

//EXPRESS WEB SERVER
app.listen(port, ()=>{
    console.log(`App is running on ${port}`)
});