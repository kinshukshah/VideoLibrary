import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";

import useStorage from "../../hooks/useStorage";

const Loading = ({ file, setFile, setVideoUrl, setDuration }) => {
  const { url, progress } = useStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      // axios.post("/api/video/getduration", url).then((res) => {
      //   if (res.data.success) {
      //     setDuration(res.data.duration);
      //     setVideoUrl(url);
      //     setFile(null);
      //   }
      // });
      setVideoUrl(url);
      setFile(null);
    }
  }, [url, setDuration, setFile, setVideoUrl]);
  if (url) {
    return null;
  } else {
    return (
      <Loader
        type="ThreeDots"
        color="#ff6347"
        height={100}
        width={100}
        timeout={100000} //3 secs
      />
    );
  }
};
export default Loading;
