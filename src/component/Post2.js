import React from "react";
import { Media } from "react-bootstrap";

const Post = (props) => {
  const data = props.data ? props.data : null;
  return (
    <Media
      style={{
        border: "1px solid #eee",
        cursor: "pointer",
        
      }}
      bg="info"
    >
      <div>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={data.uploadImageUrl}
          alt="pic"
        />
      </div>
      <Media.Body>
        <p
          style={{
            display:"block",
            maxHeight:"3em",
            wordWrap:"break-word",
            overflow:"hidden",
            lineHeight:"1.5em",
            textOverflow:"ellipsis",
            color:"white",
            fontSize:"1.5vw"
          }}
        >
          {data.title} ({data.year}) {data.language} {""}
          {data.producedby}
        </p>
      </Media.Body>
    </Media>
  );
};

export default Post;
