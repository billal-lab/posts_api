const bcrypt = require('bcrypt');


async function checkUser(user, PlainPassword) {
    const match = await bcrypt.compare(PlainPassword, user.password);
    return match
}

module.exports = checkUser;