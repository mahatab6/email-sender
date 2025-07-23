require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require("nodemailer");


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const transported = nodemailer.createTransport({

})

console.log(process.env.EMAIL_SERNDR_EMAIL)



app.get('/', (req, res) => {
  res.send('Email is runing')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})