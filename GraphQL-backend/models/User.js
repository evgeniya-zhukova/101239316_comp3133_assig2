const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        default: 0,
        required: true,
        unique: [true, "Duplicate user_id Not allowed"],
        validate(value) {
            if (value < 0){
                throw new Error("Negative user_id aren't real.");
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: [true, "Duplicate username Not allowed"],
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        //index: true, //Optional if unique is defined
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        lowercase: true,
        //Custom validation/
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
