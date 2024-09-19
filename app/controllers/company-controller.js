const Company = require('../models/company-model')
const cloudinary = require('../../config/cloudinary')
const _ = require('lodash');
const companyCltr = {}

// Get all products
companyCltr.listCompanies = async (req, res)=>{
    try{
        const companies = await Company.find();
        res.status(201).json(companies)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}

// create product
companyCltr.create = async (req, res)=>{
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({error:errors.array()})
    // }
    // console.log(req)
    const body = _.pick(req.body, ['name', 'description'])
    console.log(body)
    const company = new Company(body)
    try {
        const image = req.files.logo;
        // console.log('Image file:', image);

        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "car-rental-companies"
        });
        // console.log('Cloudinary response:', result);

        company.logo = { image_url: result.secure_url };

        const companyObj = await company.save();
        res.status(201).json(companyObj);
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json('Internal Server Error');
    }
}

// update product
companyCltr.update = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ error: errors.array() })
    // }
    const body = _.pick(req.body, ['name', 'description'])
    try{
        const image = req.files.logo
        const {files} = req
        if (files && files.logo) {
            const result = await cloudinary.uploader.upload(image.tempFilePath,{
                folder : "car-rental-companies"
            })
            body.logo = { image_url : result.secure_url }
        }
      const companyObj = await Company.findByIdAndUpdate(req.params.id, body, { new: true })
      res.status(201).json(companyObj)
    }
    catch(err){
        res.status(500).json('Internal Server Error');
    }
  }

companyCltr.delete = async(req,res)=>{
    const id = req.params.id
    try{
        const company = await  Company.findByIdAndDelete(id)
        res.status(201).json(company)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}
module.exports = companyCltr