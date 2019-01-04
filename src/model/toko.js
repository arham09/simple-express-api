//create model for restaurant

import mongoose from 'mongoose'
import Review from './review'

let Schema = mongoose.Schema

let TokoSchema = new Schema({
    //isi dari restaurant schema
    name: {
        type:String,
        required:true
    },
    tokotype:{
        type:String,
        required:true
    },
    address : String,
    reviews : [{
        type:Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Toko', TokoSchema)

