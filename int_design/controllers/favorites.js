const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery.js')
const Favorite = require('../models/favorites.js')

module.exports = router

//INDEX
router.get("/favorites", async (req, res)=> {
    try {
        const showFavorites = await Favorite.find({})
        // console.log(showFavorites)
        res.render("favorites.ejs", {
            favorites: showFavorites,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

//DELETE - Delete from favorites
router.delete("/favorites/:id", async (req, res)=> {
    try {
        const deletedItem = await Favorite.findByIdAndDelete(req.params.id)
        // console.log(deletedItem)
        res.redirect("/favorites")
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
});

//CREATE - Clicking favorite, pushes or creates the item to the favorites model
router.post("/favorites", async (req, res)=> {

    try {
        const itemFromGallery = await Gallery.findById(req.body.galleryId);
        console.log(itemFromGallery);
        if (itemFromGallery) {
            const alreadyFavorited = await Favorite.findById(itemFromGallery._id);
            if (!alreadyFavorited) {
            // this is creating a new Favorites with the information of the object I was viewing in show. but it also assigns a new _id.
            // Issue 1) alreadyFavorited is not working because the _id from Favorite model is not matching _id from Gallery so now I can favorite the same time infinitely.
            // Issue 2) Clicking the item from my favorites page will not redirect me to /gallery/:id because the _id doesnt match. I would have to create a whole new view.ejs for favorites and use the favorite _id. Not intuitive.... 
            // Issue 3) If I force the new Favorite to take the same _Id: itemFromGallery._id, Im thinking there could be potential issues if a favorited item is deleted from the gallery...
            // Solution - Instead of new Favorite, creating new documents. Somehow reference the data from the gallery instead? So that if item from gallery is deleted, it will be deleted from favorites page as well... This would also prevent me from having to make a view.ejs for /favorite/:id. AND it would make the alreadyFavorited work...
            const addFavorite = new Favorite({
                name: itemFromGallery.name,
                image: itemFromGallery.image,
                description: itemFromGallery.description,
                price: itemFromGallery.price,
                tags: itemFromGallery.tags
            });
            console.log(addFavorite);
            await addFavorite.save();
            } 
            res.redirect('/favorites');
        } else {
            res.status(404).send('Gallery item not found');
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});