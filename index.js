const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

// View engine setup
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('contact', {layout: false})
})

app.post('/send', async (req, res) => {
    
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>        
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <p>${req.body.message}</p>
    `
try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"NodeMailer Contact" <khanriza@gmail.com>', // sender address
        to: "khanriza@gmail.com", // list of receivers
        subject: "Node Contact Request", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('contact', {layout: false, msg: 'Email has been sent'})
} catch(err) {

    console.log(err)
    res.render('contact', {layout: false, msg: 'Unable to send email'})
}
})

app.listen(3000, () => {
    console.log('Server Started!')
})