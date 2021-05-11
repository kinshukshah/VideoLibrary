import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import FormInput from "../../components/form-input/form-input.component";

function UploadVideoPage() {
  const [uploadVideo, setUploadVideo] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
  });
  const Private = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];
  const Category = [
    { value: 0, label: "Films & Animations" },
    { value: 0, label: "Films & Animations" },
    { value: 0, label: "Films & Animations" },
    { value: 0, label: "Films & Animations" },
    { value: 0, label: "Films & Animations" },
  ];

  const handleChange = (e) => {
    setUploadVideo({ ...uploadVideo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(uploadVideo);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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

export default UploadVideoPage;
