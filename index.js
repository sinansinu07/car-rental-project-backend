require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5005

const configureDB = require('./config/db')
const companyCltr = require('./app/controllers/company-controller')
const carCltr = require('./app/controllers/car-controller')
configureDB()

app.use(cors())
app.use(express.json())
app.use(fileupload({useTempFiles: true}))

app.get("/api/companies", companyCltr.listCompanies)
app.post("/api/companies", companyCltr.create)

app.get("/api/cars", carCltr.listCars)
app.get("/api/:id/cars", carCltr.listCompanyCars)
app.post("/api/:id/cars", carCltr.create)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})