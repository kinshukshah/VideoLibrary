import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import FormInput from "../../components/form-input/form-input.component";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
function UploadVideoPage({ user, history }) {
  const [uploadVideo, setUploadVideo] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    fileInfo: {
      fileName: "",
      filePath: "",
    },
  });
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const Private = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];
  const Category = [
    { value: "Films & Animations", label: "Films & Animations" },
    { value: "Films & Animations", label: "Films & Animations" },
    { value: "Films & Animations", label: "Films & Animations" },
    { value: "Films & Animations", label: "Films & Animations" },
    { value: "Films & Animations", label: "Films & Animations" },
  ];

  const handleChange = (e) => {
    setUploadVideo({ ...uploadVideo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.currentUser === "") {
      return alert("Please Log In");
    }
    if (uploadVideo.title === "" || uploadVideo.description === "") {
      return alert("Please Fill all the details");
    }
    let dataToSave = {
      writer: user.currentUser._id,
      title: uploadVideo.title,
      description: uploadVideo.description,
      privacy: uploadVideo.status,
      filePath: uploadVideo.fileInfo.filePath,
      category: uploadVideo.fileInfo.category,
      duration: duration,
      thumbnail: thumbnail,
    };
    axios.post("/api/video/upload", dataToSave).then((res) => {
      if (res.data.success) {
        alert("Video uploaded successfully");
        history.push("/");
      } else {
        alert("Could not upload the video");
      }
    });
    console.log(uploadVideo);
  };

  const onDrop = (acceptedFiles) => {
    console.log(uploadVideo);
    let formData = new FormData();
    let config = { header: { "content-type": "multipart/form-data" } };
    formData.append("file", acceptedFiles[0]);
    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        let { fileName, filePath } = res.data;
        setUploadVideo({ ...uploadVideo, fileInfo: { fileName, filePath } });
        //generate thumbnail with this filepath
        axios
          .post("/api/video/thumbnail", { fileName, filePath })
          .then((res) => {
            if (res.data.success) {
              let { thumbsFilePath, fileDuration } = res.data;
              console.log(thumbsFilePath, fileDuration);
              setDuration(fileDuration);
              setThumbnail(thumbsFilePath);
            } else {
              alert("Failed to make thumnails");
            }
          });
      } else {
        alert("Failed to save the video");
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <i
                    className="fas fa-plus"
                    style={{ fontSize: "50px", color: "lightgray" }}
                  ></i>
                </div>
              </section>
            )}
          </Dropzone>
          {thumbnail !== "" && (
            <div>
              <img
                src={`http://localhost:5000/${thumbnail}`}
                alt="Thumbnail"
              ></img>
            </div>
          )}
        </div>
        <FormInput
          label={"Title"}
          name="title"
          value={uploadVideo.title}
          onChange={handleChange}
        />
        <FormInput
          label={"Description"}
          name="description"
          value={uploadVideo.description}
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange}>
          {Category.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
        <select name="status" onChange={handleChange}>
          {Private.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const MapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(MapStateToProps)(UploadVideoPage));
