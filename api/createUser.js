const {createUserDB , checkAvailable} = require('../database/mongoose.js')
const bcrypt = require('bcrypt');

module.exports = async function createUser(req,res){
    try{
    const {email , password , firstname , lastname} = req.body;
    const isAvailable = await checkAvailable(email);
    const hashcode = await bcrypt.hash(password , 12);
    if(isAvailable === 1){
        const newUser = await createUserDB(firstname , lastname , email , hashcode);
        newUser[0].isRegistered = true;
        const record = newUser[0]
        return({ ...record,message : "You have been registered" , isRegistered : true})
    }
    else{
    res.json({message : "Email is already registered" , isRegistered: false})
    }}
catch(error){
    res.status(400);
    res.send({message : "Something went wrong" , isRegistered : false})
}

}