const AuthRoute = require("../routes/user/auth"),
    UsersRoute = require("../routes/user/users"),
    ProfileRoute = require("../routes/user/profile");

exports.setupAPIs = app => {
    /******************************************************
     * User APIs
     *******************************************************/
    app.use("/api/auth", AuthRoute);
    app.use("/api/user", UsersRoute);
    app.use("/api/profile", ProfileRoute);
};
