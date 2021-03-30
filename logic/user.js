const MongoId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/user');

class UserLogicError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    toString() {
        return this.message;
    }
}

class UserLogic {
    emailIsValid(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    getUserByIdOrEmail(idOrEmail) {
        if (this.emailIsValid(idOrEmail)) {
            return this.getUserByEmail(idOrEmail);
        }

        if (MongoId.isValid(idOrEmail)) {
            return this.getUserById(idOrEmail);
        }

        return new Promise((_, reject) => reject(new UserLogicError(400, `Invalid ID or email '${idOrEmail}'`)));
    }

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            UserModel.findById(userId)
            .then(user => {
                if (!user) {
                    return reject(new UserLogicError(400, `User not found with ID '${userId}'`));
                }

                return resolve(user);
            })
            .catch(reject);
        });
    }

    getUserByEmail(userEmail) {
        return new Promise((resolve, reject) => {
            UserModel.find({ email: userEmail })
            .then(users => {
                if (users.length === 0) {
                    return reject(new UserLogicError(400, `User not found with email '${userEmail}'`));
                }

                return resolve(users[0]);
            })
            .catch(reject);
        });
    }

    checkListParam(param, name) {
        if (!Number.isInteger(param)) {
            throw new UserLogicError(400, `List param '${name}' must be integer (${param} given)`)
        }

        const intParam = parseInt(param);

        if (intParam <= 0) {
            throw new UserLogicError(400, `List param '${name}' must be greater than 0 (${param} given)`)
        }

        return intParam;
    }

    listUsersWithTotal(filter, projection, options) {
        let recordsTotal;
        let recordsFiltered;

        return UserModel.countDocuments({})
        .then(count => {
            recordsTotal = count;
            return UserModel.countDocuments(filter);
        })
        .then(count => {
            recordsFiltered = count;
            return recordsFiltered <= options.skip ? [] : UserModel.find(filter, projection, options);
        })
        .then(data => ({ recordsTotal, recordsFiltered, data }));
    }

    canUseEmail(newEmail) {
        return new Promise((resolve, reject) => {
            if (!this.emailIsValid(newEmail)) {
                return reject(new UserLogicError(400, `Invalid email '${newEmail}'`));
            }

            UserModel.find({ email: newEmail })
            .then(users => {
                if (users.length > 0) {
                    return reject(new UserLogicError(400, `Email '${newEmail}' is used for another user`));
                }

                return resolve();
            })
            .catch(reject);
        });
    }
}

module.exports = new UserLogic();
