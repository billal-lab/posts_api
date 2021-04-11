const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = (myPlaintextPassword)=>{
    return bcrypt.hash(myPlaintextPassword, saltRounds);
}

module.exports = hash