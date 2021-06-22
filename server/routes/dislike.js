const express = require("express");
const Router = express.Router();
const multer = require("multer");
var path = require("path");
const { User } = require("../model/user");
const { Video } = require("../model/video");
const { auth } = require("../middleware/auth");
const { Subscribe } = require("../model/Subscribe");
const { Like } = require("../model/like");
const { Dislike } = require("../model/dislike");

Router.post("/adddislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  const addToDislike = new Dislike(variable);
  addToDislike.save((err, dislike) => {
    if (err) return res.status(400).send(err);
    Like.findOneAndDelete(variable, (err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
    // res.status(200).json({ success: true, dislike });
  });
});
Router.post("/removedislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Dislike.findOneAndDelete(variable, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, result });
  });
});

Router.post("/getdislikedvideo", (req, res) => {
  if (req.body.videoId) {
    Dislike.find({ videoId: req.body.videoId }).exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes });
    });
  } else {
    Dislike.find({ commentId: req.body.commentId }).exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes });
    });
  }
});

module.exports = Router;
