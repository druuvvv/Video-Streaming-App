const mongoose = require('mongoose');
require('dotenv').config()
const mongooseURL = "mongodb://mongo:27017/User"
mongoose.connect(mongooseURL)
.then(() => {
    console.log("Success...")
})
.catch(err => {
    console.log("Something went wrong");
    console.log(err);
})

const userSchema = {
    firstname : String,
    lastname : String ,
    email : String ,
    hashcode : String ,
    faviorites : Array 
}

const User = mongoose.model("User" , userSchema);
const checkAvailable = async (email) => {
    try{
    const response = await User.find({email : `${email}`})
        if(response.length === 0){
            return 1
        }
        else{
            return 0;
        }
    }
    catch(err){
        console.error("Something went wrong")
        return err;
    }
}

const createUserDB = async (firstname,lastname,email,hashcode) => {
    const response = await User.insertMany([{
        firstname,
        lastname,
        email,
        hashcode
    }])
    return response;
}

const getRecords = async (email) => {
    try{
    const response = await User.findOne({
        email : `${email}`
    })
    console.log(response)
    return response;
}
catch(err){
    console.error(err);
}
}
module.exports = {createUserDB , checkAvailable , getRecords}
