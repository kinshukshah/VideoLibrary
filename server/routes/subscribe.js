const express = require("express");
const Router = express.Router();
const multer = require("multer");
var path = require("path");
const { User } = require("../model/user");
const { Video } = require("../model/video");
const { auth } = require("../middleware/auth");
const { Subscribe } = require("../model/Subscribe");

Router.post("/subscribetovideo", (req, res) => {
  const subscribeToVideo = new Subscribe(req.body);
  subscribeToVideo.save((err, subscribed) => {
    if (err) return res.status(400).send(err);
    Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
      if (err) return res.status(400).send(err);
      res
        .status(200)
        .json({ success: true, subscribeNumber: subscribe.length });
    });
  });
});

Router.post("/subscribeNumber", (req, res) => {
  Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      subscribeNumber: subscribe.length,
      subscribe,
    });
  });
});

Router.post("/issubscribed", (req, res) => {
  Subscribe.findOne(req.body).exec((err, subscribed) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      isSubscribed: subscribed ? true : false,
      //let res=false;if(sub.len!=0)res=true
    });
  });
});

Router.post("/unsubscribe", (req, res) => {
  Subscribe.deleteOne(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        result,
        subscribeNumber: subscribe.length,
      });
    });
  });
});

module.exports = Router;
