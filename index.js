require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require("nodemailer");


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const transported = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_SERNDR_EMAIL,
        pass: process.env.EMAIL_SERNDR_PASS,
    }
})


app.get('/send-payment-email', async(req, res)=>{
    paymentInfo = {
        user: 'askeyblog@gmail.com',
        name: 'John Doe',
        productName: 'Premium Subscription',
        quantity: 1,
        price: 10,
        total: 10,
        transactionId: 'TXN123456',
        date: '2025-07-23'
    }


   const email = {
    from: `Email <${process.env.EMAIL_SENDER_EMAIL}>`,
    to: paymentInfo.user,
    subject: "Payment Details",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 6px;
                box-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
            h2 {
                color: #4CAF50;
            }
            .product {
                border: 1px solid #ddd;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 4px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h2>Thank you for your purchase!</h2>
            <p>Hi ${paymentInfo.name || 'Customer'},</p>
            <p>Here are the details of your payment:</p>

            <div class="product">
                <p><strong>Product:</strong> ${paymentInfo.productName}</p>
                <p><strong>Quantity:</strong> ${paymentInfo.quantity}</p>
                <p><strong>Price:</strong> $${paymentInfo.price}</p>
                <p><strong>Total:</strong> $${paymentInfo.total}</p>
                <p><strong>Payment ID:</strong> ${paymentInfo.transactionId}</p>
                <p><strong>Payment Date:</strong> ${paymentInfo.date}</p>
            </div>

            <p>If you have any questions or issues, feel free to reply to this email.</p>

            <div class="footer">
                &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
            </div>
            </div>
        </body>
        </html>
    `
    }
    try{
        await transported.sendMail(email);
        res.send({message: "payment email sent" })
    }
    catch{
        console.error("Error sending email:", error);
    }

})



app.get('/', (req, res) => {
  res.send('Email is runing')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})