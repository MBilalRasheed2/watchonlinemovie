import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonAtt from "./CommonAtt";
import * as operations from '../model/Operation'
const GeneralPage = (props) => {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#1F3044",
        zIndex: "1",
        width:"100%",
        flexShrink:"1",
        flexBasis:"50px"
       
      }}
      className="g-0 m-1 p-0"
    >
      {props.actors.length > 0 && <CommonAtt label="actor" list={props.actors} />}
      <CommonAtt label="type" list={operations.type} />
      <CommonAtt label="year" list={operations.year} />
      <CommonAtt label="genre" list={operations.genre} />
      <CommonAtt label="producedby" list={operations.producedBy} />
    </div>
  );
};

export default GeneralPage;
