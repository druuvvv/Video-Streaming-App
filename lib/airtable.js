const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keypiYb157cFxZvsS'
});
const base = Airtable.base('apptVBXSNmzbn8K1C');

const table = base('Users');

function getRecords (records){
    return(
        records.map(record => {
            return {
                ...record.fields,
                }
        })
        )
  }
async function getUserRecords (email) {
    const findUserByEmail = await table.select(
        { filterByFormula : `email="${email}"` }).firstPage();
        const records = getRecords(findUserByEmail)
      return (records)
}

module.exports = {getRecords , getUserRecords , table}

