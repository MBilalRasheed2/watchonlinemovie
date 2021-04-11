import React, { useState, useEffect } from "react";
import './style.css';
import { Form, Dropdown } from "react-bootstrap";
import * as home from "../action/home";
import { useDispatch } from "react-redux";
import {isMobile} from 'react-device-detect'
const CommonAtt = (props) => {
  const label = props.label ? props.label.toUpperCase() : null;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    filteredList();
  }, [filterTerm]);
  const setTermValueHandler = (value) => {
    dispatch(home.filterMovie(props.label, value));
  };
  const filteredList = () => {
    let typeNames = props.list;
    let searchType = [];
    if (filterTerm === "") {
      searchType = typeNames;
    } else {
      searchType = typeNames.filter((f) => {
        const toLower = f.toLowerCase();
        return toLower.includes(filterTerm.toLowerCase());
      });
    }

    setList(searchType);
  };
  return (
    <Dropdown className="g-0 m-0 p-0">
      <Dropdown.Toggle
        style={{ backgroundColor: "#1F3044", fontSize: "1.5vw" }}
      >
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu className="g-0 m-0 p-0">
        <Form.Control
          autoFocus
          name="filterTerm"
          onChange={(e) => {
            e.preventDefault();
            setFilterTerm(e.target.value);
          }}
          value={filterTerm}
        />

        {list.map((m, index) => (
          <Dropdown.Item
            className='textStyle'
            key={index}
            onClick={() => setTermValueHandler(m)}
            style={
              isMobile
                ? {  fontSize: "3vw" }
                : {  fontSize: "1.5vw" }
            }
          >
            {m}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CommonAtt;
