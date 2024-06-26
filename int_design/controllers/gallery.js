const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery.js')
const Favorite = require('../models/favorites.js')

module.exports = router

//LANDING PAGE
router.get("/", (req, res)=> {
    res.render("home.ejs")
});

//INDEX
router.get("/gallery", async (req, res)=> {
    try {
        const showAll = await Gallery.find({})
        res.render("index.ejs", {
            gallery: showAll,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

//NEW
router.get("/gallery/new", (req, res)=> {
    res.render("new.ejs")
});

//DELETE
router.delete("/gallery/:id", async (req, res)=> {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        await Favorite.deleteMany({ galleryId: req.params.id}) 
        res.redirect("/gallery")
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

//UPDATE
router.put("/gallery/:id", async (req, res)=> {
    try {
        let updatedItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(updatedItem)
        res.redirect(`/gallery/${req.params.id}`)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

//CREATE
router.post("/gallery", async (req, res)=> {
    try {
        await Gallery.create(req.body)
        res.redirect("/gallery")
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

//EDIT
router.get("/gallery/:id/edit", async (req, res)=> {
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
router.get("/gallery/:id", async (req, res)=> {
    try {
        const singleItem = await Gallery.findById(req.params.id)
        res.render("show.ejs", {
            gallery: singleItem,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});