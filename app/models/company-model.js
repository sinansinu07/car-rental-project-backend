const mongoose = require('mongoose')

const { Schema, model } = mongoose

const companySchema = new Schema({
    name: String,
    description: String,
    logo: {
        image_url: {
                type: String,
                required: true
            }
    }
},{timestamps : true})

const  Company = model("Company", companySchema)

module.exports =  Company;