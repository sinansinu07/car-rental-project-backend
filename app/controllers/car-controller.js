const Car = require('../models/car-model')
const cloudinary = require('../../config/cloudinary')
const _ = require('lodash');
const carCltr = {}

// Get all products
carCltr.listCars = async (req, res)=>{
    try{
        const cars = await Car.find();
        res.status(201).json(cars)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}

carCltr.listCompanyCars = async (req, res)=>{
    const companyId = req.params.id
    try{
        const cars = await Car.find({company : companyId});
        res.status(201).json(cars)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}

// create product
carCltr.create = async (req, res)=>{
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({error:errors.array()})
    // }
    // console.log(req)
    const body = _.pick(req.body, ['name', 'description', 'price', 'color'])
    console.log(body)
    const car = new Car(body)
    try {
        car.company = req.params.id
        const image = req.files.carImage;
        // console.log('Image file:', image);

        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "car-rental-cars"
        });
        // console.log('Cloudinary response:', result);

        car.carImage = { image_url: result.secure_url };

        const carObj = await car.save();
        res.status(201).json(carObj);
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json('Internal Server Error');
    }
}

// update product
carCltr.update = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ error: errors.array() })
    // }
    const body = _.pick(req.body, ['name', 'description', 'price', 'color'])
    try{
        body.company = req.params.id
        const image = req.files.image
        const {files} = req
        if (files && files.image) {
            const result = await cloudinary.uploader.upload(image.tempFilePath,{
                folder : "car-rental-cars"
            })
            body.image = { image_url : result.secure_url }
        }
      const carObj = await Car.findByIdAndUpdate(req.params.id, body, { new: true })
      res.status(201).json(carObj)
    }
    catch(err){
        res.status(500).json('Internal Server Error');
    }
  }

carCltr.delete = async(req,res)=>{
    const carId = req.params.id
    try{
        const company = await  Car.findByIdAndDelete(id)
        res.status(201).json(company)
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}
module.exports = carCltr