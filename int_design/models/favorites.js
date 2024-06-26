const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const favoriteSchema = new Schema({
    galleryId: {type: Schema.Types.ObjectId, ref: 'Gallery'}
});

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite;