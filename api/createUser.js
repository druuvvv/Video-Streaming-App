const {getUserRecords , getRecords , table } = require('../lib/airtable.js')
const bcrypt = require('bcrypt');

module.exports = async function createUser(req,res){
    try{
    const {email , password , firstname , lastname} = req.body;
    const oldRecord = await getUserRecords(email);
    const hashcode = await bcrypt.hash(password , 12);
    if(oldRecord.length === 0){
        const newUser = await table.create([
            {
                fields: {
                    email,
                    hashcode,
                    firstname,
                    lastname,
                }
            }
        ])
        const records = getRecords(newUser);
        res.json({records , message : "You have been registered" , isRegistered : true})
}
else{
    res.json({message : "Email is already registered" , isRegistered: false})
}}
catch(error){
    res.status(400);
    res.send({message : "Something went wrong" , isRegistered : false})
}

}