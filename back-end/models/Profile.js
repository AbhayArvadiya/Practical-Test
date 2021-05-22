const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const profileSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profile_image: { type: String, default: "http://localhost:8080/public/profiles/default_avtar.png" },
    
}, { timestamps: true });

const User = mongoose.model("Profile", profileSchema);
module.exports = User;