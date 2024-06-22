const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery.js')

module.exports = router

//INDEX
router.get("/gallery", async (req, res)=> {
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
router.get("/gallery/new", (req, res)=> {
    // res.send(`new route`)
    res.render("new.ejs")
});

//DELETE
router.delete("/gallery/:id", async (req, res)=> {
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
router.put("/gallery/:id", async (req, res)=> {
    // seedData[req.params.id] = req.body
    // res.redirect("/gallery")
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
router.get("/gallery/:id/edit", async (req, res)=> {
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
router.get("/gallery/:id", async (req, res)=> {
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