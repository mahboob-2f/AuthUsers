import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.SENDER_EMAIL,
        pass:process.env.SMTP_PASS,
    },
})

export { transpoter };