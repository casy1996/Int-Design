const mongoose = require('mongoose')
const Schema = mongoose.Schema 

// const favoriteSchema = new Schema({
//     name: {type: String, required: true},
//     price: {type: Number, required: true, min: 1},
//     image: String,
//     description: String,
//     tags: [String],
// }, {timestamps: true});


const favoriteSchema = new Schema({
    galleryId: {type: Schema.Types.ObjectId, ref: 'Gallery'}
});



const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite;