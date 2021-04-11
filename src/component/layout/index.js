import React, { useState, useEffect } from "react";
import Header from "../header";
import "./style.css";
import { isMobile } from "react-device-detect";

const Layout = (props) => {
  if (!isMobile) {
    return (
      <div
        className="container g-0 m-auto  p-1"
        style={{ backgroundColor: "#1A2238", height: "1500px" }}
      >
        <div>
          <Header  />
          <div className="row" style={{ margin: "3px" }}>
            <div className="col-12 g-0 m-0 p-0">{props.children}</div>
          </div>
        </div>

        <div className="row" style={{ margin: "3px",backgroundColor:"#051622" }}>
          <div
            className="col-8  g-0 m-0 p-0"
            style={{ margin: "3px", }}
          >
            {props.left ? props.left : null}
           
              {props.bottom ? props.bottom : null}
           
          </div>
          <div className="col-4  g-0 m-0 p-0">
            {props.right ? props.right : null}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="container g-0 m-auto  p-1"
        style={{ backgroundColor: "#004a70" }}
      >
        <div>
          <Header />
          <div className="row" style={{ margin: "3px" }}>
            <div className="col-12 g-0 m-0 p-0">{props.children}</div>
          </div>
        </div>

        <div
          className="row"
          style={{ margin: "3px", border: "1px solid yellow" }}
        >
          <div className="col-12  g-0 m-0 p-0">
            {props.left ? props.left : null}
            {props.bottom ? props.bottom : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
