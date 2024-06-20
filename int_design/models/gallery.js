const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const gallerySchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    image: String,
    description: String,
    tags: [String],
}, {timestamps: true});

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery;