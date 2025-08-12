require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// POST booking
app.post('/book', (req, res) => {
  const { service, fullname, email, phone, country, date } = req.body;

  const message = `
    New booking received:
    Service: ${service}
    Name: ${fullname}
    Email: ${email}
    Phone: ${phone}
    Country: ${country}
    Date: ${date}
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Booking Received',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent:', info.response);
    res.send(`Thank you for booking ${service}! We will contact you soon.`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
