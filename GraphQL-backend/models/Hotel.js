const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_id: {
    type: Number,
    default: 0,
    required: true,
    unique: [true, "Duplicate hotel_id Not allowed"],
    validate(value) {
      if (value < 0){
        throw new Error("Negative hotel_id aren't real.");
      }
    }
  },
  hotel_name: {
    type: String,
    required: true,
    unique: [true, "Duplicate hotel_name Not allowed"],
    trim: true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    default: 0.0,
    required: true,
    validate(value) {
      if (value < 0.0){
        throw new Error("Negative price aren't real.");
      }
    }
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
  user_id: {
    type: Number,
    default: 0,
    required: true,
    validate(value) {
      if (value < 0){
        throw new Error("Negative user_id aren't real.");
      }
    }
  },
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
