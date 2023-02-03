const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const sectionModel = mongoose.model("users", userSchema);

module.exports = sectionModel;