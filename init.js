const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Registration-Form');
}

const Registermodel = require('./models/registrationModel');

const data = new Registermodel({
    name: "Fawzaan",
    email: "fawzaanmd@gmail.com",
    password: "3214"
});
data.save();