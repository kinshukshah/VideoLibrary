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

Router.post("/addlike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  const addToLike = new Like(variable);
  addToLike.save((err, liked) => {
    if (err) return res.status(400).send(err);
    Dislike.findOneAndDelete(variable, (err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

Router.post("/removelike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.findOneAndDelete(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, result });
  });
});

Router.post("/getlikedvideo", (req, res) => {
  if (req.body.videoId) {
    Like.find({ videoId: req.body.videoId }).exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    });
  } else {
    Like.find({ commentId: req.body.commentId }).exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    });
  }
});

module.exports = Router;
