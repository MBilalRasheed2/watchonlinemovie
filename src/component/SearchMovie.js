import React from "react";
import { Form, ListGroup } from "react-bootstrap";
const SearchMovie = (props) => {
 
  return (
    <div>
      <Form.Control
        name="setSearchTerm"
        type="text"
        onKeyUp={props.onChangeSerachTerm}
        autoComplete="off"
        placeholder="Search Movie By Title"
      />

      {props.titleList.length > 0 ? (
        <ListGroup
          variant="flush"
          style={{
            position: "absolute",
            zIndex: "2",
            width: "90%",
            top: "40px",
            margin: "5px",
          }}
        >
          {props.titleList.map((title, index) => (
            <ListGroup.Item
              key={index}
              value={title}
              onClick={(e) => props.putSearchInputValue(title)}
            >
              {title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default SearchMovie;
