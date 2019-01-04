import mongoose from 'mongoose'
import Toko from './toko'

let Schema = mongoose.Schema

let ReviewSchema = new Schema({
    title :{
        type: String,
        required:true
    },
    text : String,
    toko: {
        type:Schema.Types.ObjectId,
        ref: 'Toko',
        required: true
    }

})

module.exports = mongoose.model('Review', ReviewSchema)