const express = require("express");
const VideoRouter = express.Router();
const multer = require("multer");
var path = require("path");
const { User } = require("../model/user");
const { Video } = require("../model/video");
const { auth } = require("../middleware/auth");
const ffmpeg = require("fluent-ffmpeg");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext == ".mp4" || ext == ".jpeg") {
      cb(null, true);
    } else {
      cb(res.send(400), end("Only Mp4 files allowed"), false);
    }
  },
});

var upload = multer({ storage: storage }).single("file");

VideoRouter.post("/uploadfiles", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

VideoRouter.post("/thumbnail", async (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({ success: true, thumbsFilePath, fileDuration });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

VideoRouter.post("/upload", (req, res) => {
  const video = new Video(req.body);
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

VideoRouter.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videos });
    });
});

VideoRouter.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

module.exports = VideoRouter;
