const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    uploadedBy:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publication:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    ISBN:{
        type: Number,
        required: true
    },
    images:{
        type:Object,
        required : true
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)