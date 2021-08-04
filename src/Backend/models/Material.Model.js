const mongoose = require('mongoose');


const Materialschema = new mongoose.Schema({
    
    material_category: {
        type: String,
        required: true,
        trim: true
    },

    material_name: {
        type: String,
        required: true,
        trim: true
    },

    material_lambda: {
        type: Number,
        required: true,
        trim: true
    },
    
    material_price: {
        type: Number,
        required: true,
        trim: true
    },
    material_deletable: {
        type: Boolean,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Schema = mongoose.model('Material', Materialschema)

module.exports = Schema