const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //split(' ')[1] - removes the bearer string
        if(token === 'null') return res.sendStatus(401);
        jwt.verify(token, process.env.JWT_PASSPHARE, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            User.findOne(
                {
                    _id: user._id,
                },
                (error, user) => {
                    if (error || !user ) return res.sendStatus(401);
                    req.user = user;
                    next();
                }
            );
        });
    } catch (error) {
        return res.sendStatus(401);
    }
};

module.exports = authenticate;
