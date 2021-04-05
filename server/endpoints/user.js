const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const bcryptSalt = bcrypt.genSaltSync(10);
const secret = require('../secret');
const User = require('../models/user');
const UserLogic = require('../logic/user');
const DatatablesHelper = require('../tools/datatables-helper')

const isHttpValidErrorCode = code => code && code >= 400 && code < 600;

const catchError = (err, res, next) => {
    console.error(err);

    res
    .status(isHttpValidErrorCode(err.code) ? parseInt(err.code) : 500)
    .send({ 'toString()': err.toString(),  ...err });
    return next();
}

module.exports = {
    register: api => {
        api.route('/api/users')
        .post(function (req, res, next) {
            UserLogic.canUseEmail(req.body.email) // el email tiene un formato válido y no lo tiene ningún otro 
            .then(() => {
                const user = new User();

                user.email = req.body.email;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.password = bcrypt.hashSync(req.body.password, bcryptSalt);

                return user.save();
            })
            .then(newUser => {
                res.status(201).send(newUser);
                return next();
            })
            .catch(err => catchError(err, res, next));
        })
        .get(function (req, res, next) {
            const datatablesQuery = DatatablesHelper.toMongooseParams(req.query);

            if (datatablesQuery.datatables.search.value) {
                const search = new RegExp(datatablesQuery.datatables.search.value);

                datatablesQuery.filter = { 
                    $or:[
                        { email: search },
                        { firstName: search },
                        { lastName: search } 
                    ]
                };
            }

            UserLogic.listUsersWithTotal(
                datatablesQuery.filter,
                datatablesQuery.projection,
                datatablesQuery.options
            )
            .then(result => {
                result.draw = datatablesQuery.draw;
                res.status(200).send(result);
                return next();
            })
            .catch(err => catchError(err, res, next));
        });

        api.route('api/users/:id')
        .get(function (req, res, next) {
            UserLogic.getUserByIdOrEmail(req.params.id)
            .then(user => {
                res.status(200).send(user);
                return next();
            })
            .catch(err => catchError(err, res, next));
        })
        .delete(function (req, res, next) {
            UserLogic.getUserByIdOrEmail(req.params.id)
            .then(user => {
                user.delete();
                res.status(200).send(user);
                return next();
            })
            .catch(err => catchError(err, res, next));
        })
        .put(function (req, res, next) {
            let user;

            UserLogic.getUserByIdOrEmail(req.params.id)
            .then(_user => {
                user = _user;
                if (req.body.email !== user.email) {
                    return UserLogic.canUseEmail(req.body.email);
                }
                else {
                    return null;
                }
            })
            .then(() => {
                user.email = req.body.email;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.password = bcrypt.hashSync(req.body.password, bcryptSalt);
                return user.save();
            })
            .then(_user => {
                res.status(200).send(_user);
                return next();
            })
            .catch(err => catchError(err, res, next));
        });

        api.route('/login')
        .post(function (req, res, next) {
            UserLogic.getUserByEmail(req.body.email)
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(201).send({ token: jwt.encode({ id: user.id, email: user.email }, secret) });
                }
                else {
                    res.status(403).send({ message: 'Wrong password' });
                }
                return next();
            })
            .catch(err => catchError(err, res, next));
        });

        api.route('/token/:token')
        .get(function (req, res, next) {
            try {
                res.status(200).send(jwt.decode(req.params.token, secret));
            } catch(err) {
                res.status(500).send(err);
            }
            return next();
        });
    }
}
