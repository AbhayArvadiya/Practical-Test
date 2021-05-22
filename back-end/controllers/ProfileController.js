const multer = require("multer"),
    UserUtil = require("../services/util"),
    imageFilters = require("../helpers/image-filters"),
    User = require("../models/User"),
    Profile = require("../models/Profile"),
    validator = require("validator"),
    { LANGUAGES } = require("../domain/languages");

/***********************************************************
 * updateProfile function handle to update user Profile
 * Method: PUT
 * Put Params: firstName, lastName, email, mobile, username
 *
 * Return:
 * 	- 200: Success
 * 	- 400: Bad Request
 *  - 409: Already There/Used
 * 	- 500: Server error
 ***********************************************************/
const updateProfile = async(request, response) => {
    const userId = request.user._id;
    const fileMaxSize = 5 * 1024 * 1024; // calculation represent the max file size in MB(5MB)

    let upload = await multer({
        storage: UserUtil.getStorage("/profiles"),
        fileFilter: imageFilters.profileImageFilter,
        limits: { fileSize: fileMaxSize },
    }).single('image');

    upload(request, response, err => {
        if (request.fileValidationError) return response.status(400).send({ error: request.fileValidationError });
        if (err) return response.status(500).send({ error: LANGUAGES.en.SERVER_ERROR });
        const { firstName, lastName, email, mobile, username } = request.body;
       
        if (!firstName || validator.isEmpty(firstName) ||
            !lastName || validator.isEmpty(lastName) ||
            !email || validator.isEmpty(email) || !validator.isEmail(email) ||
            !mobile || validator.isEmpty(mobile) || !validator.isMobilePhone(mobile) ||
            !username || validator.isEmpty(username)){ 
                UserUtil.removeFile("./public/profiles/", request.file.filename, function(err, result) {
                    if (err) return response.status(400).json({ error: LANGUAGES.en.SERVER_ERROR });
                    else return response.status(400).send({ error: LANGUAGES.en.MISSING_FILDS });
                });
        }
        else{
        User.findOne({ username: { $eq: username }, _id: { $ne: userId } }).exec((err, user) => {
            if (err) return response.status(500).json({ error: LANGUAGES.en.SERVER_ERROR });
            if (user) {
                UserUtil.removeFile("./public/profiles/", request.file.filename, function(err, result) {
                    if (err) return response.status(400).json({ error: LANGUAGES.en.SERVER_ERROR });
                    else return response.status(409).json({ error: "User already in usage" });
                });
            }
                var profile={}
                if (request.file) { profile.profile_image = "http://localhost:8080/public/profiles/" + request.file.filename;}
            
            Profile.findOneAndUpdate({ user_id: userId }, profile,{new:false},
                (error, result) => {
                    if (error || !result) return response.status(500).json({ error: LANGUAGES.en.SERVER_ERROR });
                    let old_file = result.profile_image;
                    User.findByIdAndUpdate(
                        userId, {
                            $set: {
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                phone: mobile,
                                username: username,
                            },
                        },
                        (error, result) => {
                            if (error || !result) return response.status(500).json({ error: LANGUAGES.en.SERVER_ERROR });
                            if (request.file) {
                                if(old_file && old_file != 'http://localhost:8080/public/profiles/default_avtar.png'){
                                    let fileName = /[^/]*$/.exec(old_file)[0];
                                    UserUtil.removeFile("./public/profiles/", fileName, function(err, result) {
                                        if (err) return response.status(400).json({ error: LANGUAGES.en.SERVER_ERROR });
                                        else return response.status(200).send({ message: "Profile updated successfully" });
                                    })
                                }
                                else return response.status(200).send({ message: "Profile updated successfully" });
                            }
                            else return response.status(200).send({ message: "Profile updated successfully" });
                        });
                    });
            });
        }
    });
}

/***********************************************************
 * getProfile function return user's profile data
 * Method: GET
 *
 * Return:
 * 	- 200: Success
 * 	- 500: Server error
 ***********************************************************/
const getProfile = (req, res) => {
    User.findById(req.user._id, (error, user) => {
        if (error || !user) return res.status(500).json({ error: LANGUAGES.en.SERVER_ERROR });
        let configured_user = {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
        };
        Profile.findOne({
                user_id: req.user._id,
            },
            (error, user) => {
                if (error || !user) return res.status(500).json({ error: LANGUAGES.en.SERVER_ERROR });
                configured_user.profile_image = user.profile_image;
                return res.status(200).json({ user: configured_user });
            }
        );
    });
};
module.exports = { updateProfile, getProfile };