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

// https://www.mongodb.com/community/forums/t/how-to-reference-the-objectid-from-one-collection-schema-to-another/203108
// https://github.com/rohan-paul/Awesome-JavaScript-Interviews/blob/master/MongoDB/referencing-another-schema-in-Mongoose-2.md
// https://mongoosejs.com/docs/populate.html

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite;