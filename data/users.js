const users = {
    standard : {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    locked: {
        username: 'locked_out_user',
        password: process.env.PASSWORD
    },
    invalid: {
        username: 'wrong_user',
        password: 'wrong_password'
    }
};

module.exports = { users };