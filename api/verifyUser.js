const {getUserRecords , getRecords , table } = require('../lib/airtable.js')
const bcrypt = require('bcrypt');

module.exports = async function verifyUser(req,res){
    try{
    const {email , password } = req.body;
    const userRecords = await getUserRecords(email);
    const isValid = await bcrypt.compare(password , userRecords[0].hashcode);
    if(isValid){
        userRecords[0].isVerified = true
    }
    else{
        userRecords[0].isVerified = false
    } 
    return(userRecords[0]);
}   
    catch(error){
        res.status(400);
        console.error(error);
    }
}