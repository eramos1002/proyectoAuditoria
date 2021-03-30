const { bdInit } = require('../bdConf');
const bcrypt = require('bcrypt-nodejs');
const bcryptSalt = bcrypt.genSaltSync(10);
const UserModel = require('../models/user');
const UserLogic = require('../logic/user');
const users = require('./random-users.json');

const promises = users.map(
    randomUser => UserLogic.canUseEmail(randomUser.email)
    .then(() => {
        const user = new UserModel();

        user.email = randomUser.email;
        user.firstName = randomUser.firstName;
        user.lastName = randomUser.lastName;
        user.password = bcrypt.hashSync(randomUser, bcryptSalt);

        return user.save();
    })
);

bdInit()
.then(() => Promise.all(promises))
.then(users => console.log(`Saved ${users.length} users`))
.catch(err => console.error(err));
