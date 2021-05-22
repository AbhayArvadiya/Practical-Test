const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        username: {type: String,unique: true},
        email: {type: String},
        phone: {type: String},
        password: {type: String},
        isActive: {type: Boolean, default: false},
    },
    {timestamps: true}
);

userSchema.pre("save", function (next) {
    User.findOne({_id: this._id}).then(user => {
        if (!user || this.password != user.password)
            bcrypt.hash(this.password, 10, (err, hashedPass) => {
                this.password = hashedPass;
                next();
            });
        else next();
    });
});
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
