const { bdInit } = require('../bdConf');
const bcrypt = require('bcrypt-nodejs');
const bcryptSalt = bcrypt.genSaltSync(10);
const UserModel = require('../models/user');
const BuildingModel = require('../models/building');
const UserLogic = require('../logic/user');
const users = require('./users.json');
const buildings = require('./buildings.json');

const userPromises = users.map(
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

const buildingPromises = buildings.map(
    building => {
        const newBuilding = new BuildingModel(building);
        return newBuilding.save();
    }
);

bdInit()
.then(() => Promise.all(userPromises))
.then(users => console.log(`Saved ${users.length} users`))
.then(() => Promise.all(buildingPromises))
.then(buildings => console.log(`Saved ${buildings.length} buildings`))
.catch(err => console.error(err));
