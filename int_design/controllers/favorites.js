const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery.js')
const Favorite = require('../models/favorites.js')

module.exports = router

//INDEX
// router.get("/favorites", async (req, res)=> {
//     try {
//         const showFavorites = await Favorite.find({})
//         // console.log(showFavorites)
//         res.render("favorites.ejs", {
//             favorites: showFavorites,
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).send(error)
//     }
// });

router.get("/favorites", async (req, res)=> {
    try {
        const showFavorites = await Favorite.find().populate('galleryId').exec();
        console.log(showFavorites)
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
// router.post("/favorites", async (req, res)=> {

//     try {
//         const itemFromGallery = await Gallery.findById(req.body.galleryId);
//         console.log(itemFromGallery);
//         if (itemFromGallery) {
//             const alreadyFavorited = await Favorite.findById(itemFromGallery._id);
//             if (!alreadyFavorited) {
//             const addFavorite = new Favorite({
//                 name: itemFromGallery.name,
//                 image: itemFromGallery.image,
//                 description: itemFromGallery.description,
//                 price: itemFromGallery.price,
//                 tags: itemFromGallery.tags
//             });
//             console.log(addFavorite);
//             await addFavorite.save();
//             } 
//             res.redirect('/favorites');
//         } else {
//             res.status(404).send('Gallery item not found');
//         }
//     } catch (error) {
//         console.error(error)
//         res.status(500).send(error);
//     }
// });

router.post("/favorites", async (req, res)=> {

    try {
        const itemFromGallery = await Gallery.findById(req.body.galleryId);
        // console.log(req.body);
        if (itemFromGallery) {
            const alreadyFavorited = await Favorite.findOne({galleryId: itemFromGallery._id});
            console.log(alreadyFavorited)
            if (!alreadyFavorited) {
                const addFavorite = new Favorite({
                galleryId: itemFromGallery._id
            });
            console.log(addFavorite);
            await addFavorite.save();
            res.redirect('/favorites');
            } 
        } else {
            res.status(404).send('Gallery item not found');
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});