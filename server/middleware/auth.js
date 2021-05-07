const { User } = require("../model/user");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err)
      return res.status(404).json({ isAuth: false, error: true, message: err });
    if (!user) return res.status(404).json({ isAuth: false, error: true });

    req.user = user;
    req._id = user._id;
    next();
  });
};

module.exports = { auth };
