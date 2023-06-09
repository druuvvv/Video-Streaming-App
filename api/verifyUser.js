const {getRecords} = require('../database/mongoose.js');
const bcrypt = require('bcrypt');

module.exports = async function verifyUser(req,res){
    try{
    const {email , password } = req.body;
    const Record = await getRecords(email);
    const userRecord = {firstname : Record.firstname , lastname : Record.lastname , email : Record.email , hashcode : Record.hashcode}
    if(userRecord){
        const isValid = await bcrypt.compare(password , userRecord.hashcode);
        console.log(isValid);
        if(isValid){
            userRecord['isVerified'] = true;
        }
        else{
            userRecord['isVerified'] = false;
        } }
        else{
            userRecord = {};
            userRecord['message'] = "Invalid Email or Password"
        }
        console.log({userRecord})
        return(userRecord);
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