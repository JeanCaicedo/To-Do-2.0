const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const decryptPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) throw new Error('Invalid credentials');

    return isMatch;
}

module.exports = {
        encryptPassword,
        decryptPassword
};
