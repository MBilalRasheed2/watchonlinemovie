import React from "react";
import Post from "./Post";
import Post2 from "./Post2";
import firebase from "firebase";
import { Link } from "react-router-dom";
const LinkGenerator = (props) => {
  const data = props.data;
  const viewIncreaseHandle = async (id) => {
    const docRef = await firebase
      .firestore()
      .collection("movies")
      .doc(`${id}`)
      .get();
    if (!docRef && !docRef.exists) {
      console.log("doc not found");
    } else {
      const getDoc = firebase.firestore().collection("movies").doc(`${id}`);
      const updatedoc = getDoc.update({
        views: firebase.firestore.FieldValue.increment(1),
      });
    }
  };
  const id = `${data.title}(${data.year}) ${data.language} ${data.producedby} watch online free download &&${data.id}`;
  const trim = id.split(/\s/).join("-");
  return (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      to={`/details/${trim}`}
      onClick={() => viewIncreaseHandle(data.id)}
    >
      {props.post && <Post data={data} />}
      {props.post2 && <Post2 data={data} />}
    </Link>
  );
};

export default LinkGenerator;
