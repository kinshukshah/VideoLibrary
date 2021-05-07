const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.checkpassword = function (plainpassword, cbf) {
  var user = this;
  bcrypt.compare(plainpassword, user.password, function (err, result) {
    // result == true
    if (!result) return cbf(err, result);
    cbf(null, result);
  });
};

UserSchema.methods.generatetoken = async function (cbf) {
  var user = this;
  var token = await jwt.sign({ _id: user._id }, "secret");
  user.token = token;
  await user.save((err, user) => {
    if (err) return cbf(err);
    cbf(null, user);
  });
};

UserSchema.statics.findByToken = function (token, cbf) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    if (err) return cbf(err);
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cbf(err);
      cbf(null, user);
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
