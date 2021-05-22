const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/manageuser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});


const db = mongoose.connection;
db.on("error", err => {
    console.log(err);
});

db.once("open", () => {
    console.log("Database Connection Established!");
});
