const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");
const { mongoURI } = require("./config/key");
const { auth } = require("./middleware/auth");
const { router } = require("./routes/user");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello k$hah");
});

app.use("/api/users", require("./routes/user"));

// app.get("/api/user/auth", auth, (req, res) => {
//   res.status(200).json({
//     isAuth: true,
//     error: false,
//     _id: req._id,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//   });
// });

// app.get("/api/user/logout", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// });

// app.post("/api/users/register", async (req, res) => {
//   try {
//     const NewUser = new User(req.body);
//     const savedUser = await NewUser.save();
//     res.status(200).json({ success: true, userAdded: savedUser });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Unable to Add User", error: err });
//   }
// });

// app.post("/api/user/login", (req, res) => {
//   try {
//     //Check if Email Exists
//     User.findOne({ email: req.body.email }, (err, user) => {
//       if (!user) {
//         return res.json({
//           success: false,
//           message: "Authentaication failed,Email Not Found !!",
//         });
//       }

//       user.checkpassword(req.body.password, (err, isMatch) => {
//         if (!isMatch) {
//           return res.json({ success: false, message: "Password Incorrect" });
//         } else {
//           user.generatetoken((err, user) => {
//             if (err) {
//               return res.status(400).send(err);
//             }
//             res
//               .cookie("x_auth", user.token)
//               .status(200)
//               .json({ loginSuccess: true });
//           });
//         }
//       });
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
