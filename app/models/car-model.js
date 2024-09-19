const mongoose = require('mongoose')

const { Schema, model } = mongoose

const carSchema = new Schema({
    company : {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: String,
    description: String,
    price: Number,
    color: String,
    carImage: {
        image_url: {
                type: String,
                required: true
            }
    }
},{timestamps : true})

const  Car = model("Car", carSchema)

module.exports=  Car;