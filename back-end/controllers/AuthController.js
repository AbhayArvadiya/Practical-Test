const User = require("../models/User"),
    Profile = require("../models/Profile"),
    bcrypt = require("bcryptjs"),
    validator = require("validator"),
    UserUtil = require("../services/util"),
    { LANGUAGES } = require("../domain/languages");

/***********************************************************
 * register function registers a new user
 * Method: POST
 * Post Params: firstName, lastName, email, mobileNo, password
 * 
 * Return:
 * 	- 200: Success
 * 	- 400: Bad Request
 *  - 409: Unique key
 ***********************************************************/
const register = async(request, response) => {

    const { firstName, lastName, email, mobileNo, password } = request.body;

    if (!firstName || validator.isEmpty(firstName) ||
        !lastName ||  validator.isEmpty(lastName) ||
        !email || validator.isEmpty(email) || !validator.isEmail(email) ||
        !mobileNo || validator.isEmpty(mobileNo) || !validator.isMobilePhone(mobileNo) ||
        !password || validator.isEmpty(password) 
    )return response.status(400).send({ error: "Missing fields" });

    const emailAlreadyExists = await User.findOne({ email: email });
    if (emailAlreadyExists) return response.status(409).send({ error: "Email already in usage" });

    var username;
    UserUtil.generateUsername(firstName, lastName, function(err, getUsername) {
        if (err) return response.status(400).json({ error: "Somthing went wrong! Please try again" });
        username = getUsername;
    });

    let user = new User({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        phone: mobileNo,
        password: password,
    });
    user.save(function(err, user) {
        if (err) {
            return response.status(400).json({ error: "Somthing went wrong! Please try again" });
        } else {
            
            let profile = new Profile({
                user_id: user._id,
            });
            profile.save(function(err, profile) {
                if (err) return response.status(400).json({ error: "Somthing went wrong! Please try again" });
                return response.status(200).json({ message: "Your account has been created" });
            });
        }
    });
};

/***********************************************************
 * AuthController function handle login process for the user.
 * Method: POST
 * Post Params: username, password
 *
 * Return:
 * 	- 200: Success
 * 	- 400: Bad Request
 *  - 404: Not Found
 *  - 401: Unauthorized
 * 	- 500: Server error
 ***********************************************************/
const login = (request, response) => {
    const { username, password } = request.body;

    if (!username || validator.isEmpty(username) ||
        !password || validator.isEmpty(password) 
    )return response.status(400).send({ error: "Missing fields" });

    User.findOne({ $or: [{ email: username }, { username: username }] })
        .then(user => {
            if (!user) return response.status(404).json({ error: "No user found!" });

            bcrypt.compare(password, user.password, function(err, result) {
                if (err) return response.status(500).json({ error: err });
                if (!result) return response.status(400).json({ error: "We are sorry, could not find your account" });
                else{
                    let _user = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        _id: user._id,
                    };
                    let token = UserUtil.generateJWT(_user);
                    if (token) return response.status(200).json({ authToken: token });
                }
            });
        })
        .catch(error => {
            return response.status(401).json({
                error: error.message,
            });
        });
};

module.exports = { register, login };