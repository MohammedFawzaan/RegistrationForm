const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 3000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Registration-Form');
}

const Registermodel = require('./models/registrationModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await Registermodel.findOne({email : email});
        // check for existing user
        if(!existinguser) {
            const data = new Registermodel({
                name: name,
                email: email, 
                password: password
            });
            await data.save();
            
            res.redirect("/success");
        } else {
            console.log("user already exist");
            res.redirect("/error");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
});

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/pages/success.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/pages/error.html");
});

app.listen(port, ()=>{
    console.log(`App listening on ${port}`)
});