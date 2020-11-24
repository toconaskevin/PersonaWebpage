require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sendMail = require('./mail');

const PORT = process.env.PORT || 8181;
app.use(cors());

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.post('/email', (req, res) => {
    const { subject, email, message } = req.body;
    console.log("Data: ", req.body);

    sendMail(email, subject, message, (err, data) => {
        if(err){
            res.status(500).json({ response: 'Internal Error' });
        } else {
            res.json({ response: 'Email sent!' })
        }
    });
    
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));