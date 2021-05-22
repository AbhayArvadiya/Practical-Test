exports.profileImageFilter = (req, file, cb) => {
    if (!file) {
        cb(null, true);
    } else if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
