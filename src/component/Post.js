import React from "react";
import "./style.css";
import { Card, Image } from "react-bootstrap";
const Post = (props) => {
  const data = props.data ? props.data : null;

  return (
    <div className="card">
      <div className="textStyle">
        <p>
          {data.title}&nbsp;{data.language}
          &nbsp; {data.year}
          &nbsp;
          {data.producedby}
          &nbsp;
        </p>
      </div>
      <div style={{ margin: "2px" }}>
        <Image
          src={data.uploadImageUrl}
          style={{ width: "100%", height: "140px" }}
        />
      </div>
      <div className="textStyle" style={{ height: "1.5em" }}>
        <p>
          views{""} {data.views}
        </p>
      </div>
    </div>
  );
};
export default Post;
