const {getUserRecords , getRecords , table } = require('../lib/airtable.js')
const bcrypt = require('bcrypt');

module.exports = async function verifyUser(req,res){
    try{
    const {email , password } = req.body;
    const userRecords = await getUserRecords(email);
    console.log(userRecords)
    if(userRecords.length > 0){
    const isValid = await bcrypt.compare(password , userRecords[0].hashcode);
    if(isValid){
        userRecords[0].isVerified = true
    }
    else{
        userRecords[0].isVerified = false
    } }
    else{
        userRecords[0] = {};
        userRecords[0].message = "Invalid Email or Password"
    }
    return(userRecords[0]);
}   
    catch(error){
        res.status(400);
        const userRecords = {};
        userRecords.message = "Something Went Wrong :("
        console.log(userRecords);
        console.error(error);
        return(userRecords);
    }
}