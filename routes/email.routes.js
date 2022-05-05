const router = require("express").Router();
const nodemailer = require('nodemailer');
const correo = require('../models/email.model')



router.post('/send-email', (req, res, next) => {
    let { email, subject, message } = req.body;
    console.log(req.body)
    
    let transporter = nodemailer.createTransport({  // sender 
        service: 'Gmail',
        auth: {
        user: 'splice.finanzas@gmail.com',
        pass: '12345678Pepino$',
        }
    });
    transporter.sendMail({
        from: 'splice.finanzas@gmail.com',
        to: email, 
        subject: subject, 
        text: message,
        html: `<b>${message}</b>` 
    })
    .then(info => {
        console.log(info)
        res.render('message', {email, subject, message, info})
    })    
    .catch(error => console.log(error));
    });


//ironhack para meta 






module.exports = router;