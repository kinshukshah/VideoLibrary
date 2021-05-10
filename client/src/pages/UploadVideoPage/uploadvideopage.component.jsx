import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import FormInput from "../../components/form-input/form-input.component";

function UploadVideoPage() {
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
  return (
    <div>
      <form>
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
        <FormInput label={"Title"} />
        <FormInput label={"Description"} />
        <select>
          {Category.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
        <select>
          {Private.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
      </form>
    </div>
  );
}

export default UploadVideoPage;
