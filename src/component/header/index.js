import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import * as home from "../../action/home";
import { Link } from "react-router-dom";
import SearchMovie from "../SearchMovie";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import * as operationAction from "../../action/operation";
import "./style.css";
const Header = (props) => {
  const dispatch = useDispatch();
  const operation = useSelector((state) => state.operation);
  const [operationTitle, setOperationTitle] = useState(null);
  const [titleList, setTitleList] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  useEffect(() => {
    dispatch(operationAction.operationLoad());
  }, []);
  useEffect(() => {
    setOperationTitle(operation.titles);
  }, [operation]);
  useEffect(() => {
    if (searchMovie !== "") {
      dispatch(home.searchMovieByTitle(searchMovie));
    }
  }, [searchMovie]);
  const [listElement, setListElement] = useState([
    "Hindi",
    "Hindi Dubbed",
    "Punjabi",
    "English",
    "Seasons",
    "Horror ",
    "Action ",
  ]);
  const onChangeSerachTerm = async (e) => {
    let value = e.target.value;
    let listOFTitles = operationTitle.filter((f) => {
      if (value === "") {
        return false;
      } else {
        return f.includes(value);
      }
    });
    setTitleList(listOFTitles);
  };

  const putSearchInputValue = (title) => {
    setSearchMovie(title);
    setTitleList([]);
  };
  const routerLink = (link) => {
    let toLower = link.toLowerCase();

    return `/category/${toLower}`;
  };
  let simpleNav = (
    <Navbar
      className="linkstyle"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={isMobile?{position:"absolute",zIndex:"2",top:0}:null}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className="mr-auto"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Nav.Item>
            <Nav.Link eventKey="1" as={Link} to={"/category/home"}>
              HOME
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {listElement.map((link, index) => (
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link>
                <Nav.Link
                  eventKey={index + 1}
                  as={Link}
                  style={{ textDecoration: "none", color: "white" }}
                  to={routerLink(link)}
                >
                  {link.toUpperCase()}
                </Nav.Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );

  if (isMobile) {
    return (
      <Navbar
        className="linkstyle"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          
          <SearchMovie
            titleList={titleList}
            putSearchInputValue={putSearchInputValue}
            onChangeSerachTerm={onChangeSerachTerm}
          />
          
          
          <div>{simpleNav}</div>
        </div>
      </Navbar>
    );
  } else {
    return <div className="linkstyle">{simpleNav}</div>;
  }
};

export default Header;
