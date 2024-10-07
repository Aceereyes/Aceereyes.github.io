const express = require('express');
const nodemailer = require('nodemailer');
const form = document.getElementById('contact_form');
const sendMessageButton = document.getElementById('send_message');
const app = express();

sendMessageButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('/contact', {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
      document.getElementById('success_message').innerHTML = message;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById('error_message').innerHTML = 'Error sending message';
    });
  });

app.use(express.urlencoded({ extended: false }));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: 'aaronchristian.adr@gmail.com',
        subject: 'Contact Form Submission',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});