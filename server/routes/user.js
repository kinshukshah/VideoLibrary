const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    error: false,
    _id: req._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

router.post("/register", async (req, res) => {
  try {
    const NewUser = new User(req.body);
    const savedUser = await NewUser.save();
    res.status(200).json({ success: true, userAdded: savedUser });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to Add User", error: err });
  }
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
  try {
    //Check if Email Exists
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          success: false,
          message: "Authentaication failed,Email Not Found !!",
        });
      }

      user.checkpassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ success: false, message: "Password Incorrect" });
        } else {
          user.generatetoken((err, user) => {
            if (err) {
              return res.status(400).send(err);
            }
            res
              .cookie("x_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, user });
          });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
