const express = require("express");
const Router = express.Router();
const multer = require("multer");
var path = require("path");
const { User } = require("../model/user");
const { Video } = require("../model/video");
const { auth } = require("../middleware/auth");
const { Subscribe } = require("../model/Subscribe");
const { Comment } = require("../model/comment");

Router.post("/saveComment", (req, res) => {
  const commentToVideo = new Comment(req.body);
  commentToVideo.save((err, comment) => {
    if (err) return res.status(400).send(err);
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, comment) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comment });
      });
  });
});

Router.post("/getAllComments", (req, res) => {
  Comment.find(req.body)
    .populate("writer")
    .exec((err, commentlist) => {
      if (err) return res.status(200).send(err);
      res.status(200).json({ success: true, commentlist });
    });
});

// Router.post("/subscribeNumber", (req, res) => {
//   Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({
//       success: true,
//       subscribeNumber: subscribe.length,
//       subscribe,
//     });
//   });
// });

// Router.post("/issubscribed", (req, res) => {
//   Subscribe.findOne(req.body).exec((err, subscribed) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({
//       success: true,
//       isSubscribed: subscribed ? true : false,
//       //let res=false;if(sub.len!=0)res=true
//     });
//   });
// });

// Router.post("/unsubscribe", (req, res) => {
//   Subscribe.deleteOne(req.body, (err, result) => {
//     if (err) return res.status(400).send(err);
//     Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({
//         success: true,
//         result,
//         subscribeNumber: subscribe.length,
//       });
//     });
//   });
// });

// Router.post("/getSubscriptionVideos", (req, res) => {
//   Subscribe.find(req.body).exec((err, subscriber) => {
//     if (err) return res.status(400).send(err);
//     let subscriberUser = [];
//     subscriber.map((sub, i) => {
//       subscriberUser.push(sub.userTo);
//     });
//     // res.status(200).json({ success: true, subscriberUser });
//     User.find({ _id: { $in: subscriberUser } }).exec((err, users) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({ success: true, users });
//     });
//   });
// });

module.exports = Router;
