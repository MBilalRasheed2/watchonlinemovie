import React, { useState } from "react";
import { Nav, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
const List = (props) => {
  const [show, setShow] = useState(false);
  const list = props.list ? props.list : null;
  const main = props.main ? props.main : null;
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  const handleClickListItem = (e) => {
    
    setShow(false);
  };

  return (
    <div>
      <Nav.Link onMouseOver={handleShow}>
        {isMobile ? (
          <p>{main}</p>
        ) : (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/category/${main}`}
          >
            {main}
          </Link>
        )}
      </Nav.Link>
      {show ? (
        <ListGroup
          style={{
            position: "absolute",
            zIndex: "1",
            listStyle: "none",
            color: "white",
          }}
          onMouseLeave={handleHide}
        >
          {list
            ? list.map((m, index) => (
                <ListGroup.Item
                  action
                  variant="info"
                  onClick={handleClickListItem}
                  key={index}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/category/${main}/${m}`}
                  >
                    {m}
                  </Link>
                </ListGroup.Item>
              ))
            : null}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default List;
