const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    author: {
      type: Boolean,
      required: true,
      default: false
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
      type: String
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
},
    {
        versionKey: false
    });

const UsersModel = mongoose.model("Users", userSchema);

module.exports = UsersModel;