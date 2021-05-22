const jwt = require("jsonwebtoken"),
    multer = require("multer"),
    fs = require("fs"),
    path = require("path");

exports.generateJWT = obj => {
    return jwt.sign(obj, process.env.JWT_PASSPHARE, { expiresIn: process.env.JWT_EXPIRY_TIME });
};

exports.getStorage = target_path => {
    return multer.diskStorage({
        destination: function(req, file, cb) {
            let file_directory = path.join(__dirname, "../public") + target_path;
            if (!fs.existsSync(file_directory)) {
                fs.mkdirSync(file_directory);
            }
            cb(null, path.join(__dirname, "../public") + target_path);
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + "-" + Math.floor(10000000 + Math.random() * 90000000) + path.extname(file.originalname));
        },
    });
};

exports.removeFile = (target_path,filename, CB) => {
    fs.unlink(target_path + filename, err => {
        if (err) CB(err, null);
        CB(null, filename);
    });
};

exports.generateUsername = (firstName, lastName, CB) => {
    let username = firstName.toLowerCase() + lastName.toLowerCase() + Math.floor(10000000 + Math.random() * 90000000);
    CB(null, username);
};

exports.paginator = (items, page_no, per_page, CB) => {
    var offset = page_no * per_page,
        paginatedUsers = items.slice(offset).slice(0, per_page);
    CB(null, paginatedUsers);
};
