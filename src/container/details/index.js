import React, { useState, useEffect } from "react";
import Layout from "../../component/layout";
// import ReactPlayer from "react-player";
import Post2 from "../../component/Post2";
import LinkGenerator from "../../component/LinkGenerator";
import { isMobile } from "react-device-detect";
import { MDBContainer, MDBIframe } from "mdbreact";
import { Button, Spinner, Media } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as home from "../../action/home";
import * as operationAction from "../../action/operation";
const Details = (props) => {
  const parameter1 = props.match.params.id ? props.match.params.id : null;
  const split = parameter1 ? parameter1.split("&&") : null;
  const getId = split[1];
  const dispatch = useDispatch();
  const requriedMovieState = useSelector((state) => state.movie);
  const operation = useSelector((state) => state.operation);
  const recentOrPopular = useSelector((state) => state.recentOrPopular);
  const [defaultList, setDefaultList] = useState("recent");
  const [recentOrPopularMovies, setRecentOrPopularMovies] = useState([]);
  const [recentOrPopularLoading, setRecentOrPopularLoading] = useState(false);
  const [recentOrPopularError, setRecentOrPopularError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [requiredMovie, setRequiredMovie] = useState(null);
  const [requiredLoading, setRequiredLoading] = useState(false);
  const [requiredError, setRequiredError] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(5);
  const [condition, setCondition] = useState(null);
  const [watchUrls, setWatchUrls] = useState([]);

  useEffect(() => {
    dispatch(home.requiredMovie(getId));
    dispatch(home.recentOrPopularMovies(defaultList, null, null));
    dispatch(operationAction.operationLoad());
  }, []);
  useEffect(() => {
    dispatch(home.requiredMovie(getId));
    dispatch(home.recentOrPopularMovies(defaultList, null, null));
    dispatch(operationAction.operationLoad());
  }, [getId]);
  useEffect(() => {
    dispatch(home.recentOrPopularMovies(defaultList, lastDoc, condition));
  }, [condition]);
  useEffect(() => {
    dispatch(home.recentOrPopularMovies(defaultList, null, null));
  }, [defaultList]);
  useEffect(() => {
    setRecentOrPopularLoading(recentOrPopular.loading);
    setRecentOrPopularMovies(recentOrPopular.movies);
    setLastDoc(recentOrPopular.lastDoc);
    setRecentOrPopularError(recentOrPopular.error);
  }, [recentOrPopular]);
  useEffect(() => {
    setRequiredLoading(requriedMovieState.loading);
    setRequiredMovie(requriedMovieState.movie);
    setWatchUrls(requriedMovieState.movie.watchUrls);
    setRequiredError(requriedMovieState.error);
  }, [requriedMovieState]);
  useEffect(() => {
    setLastPage(operation.size);
  }, [operation]);

  const nextPage = () => {
    if (currentPage >= lastPage) {
      alert("this is last Page");
    } else {
      setCurrentPage((prevState) => 5 + prevState);
      setCondition("next");
    }
  };

  const prevPage = () => {
    if (currentPage === 5) {
      alert("this is first Page");
    } else {
      setCurrentPage((prevState) => prevState - 5);

      setCondition("prev");
    }
  };

  const [selected, setSelected] = useState({
    recent: true,
    popular: false,
  });
  const seletedCss = {
    borderRadius: "0px",
    height: "100%",
    width: "50%",
    fontSize: "1.2vw",
    borderTop: "1px  solid yellow",
    borderLeft: "1px  solid yellow",
    borderRight: "1px  solid yellow",
    pointerEvent: "none",
    backgroundColor: "#212529",
  };
  const UnseletedCss = {
    borderRadius: "0px",
    height: "100%",
    width: "50%",
    fontSize: "1.2vw",
    pointerEvent: "none",
    borderBottom: "1px  solid yellow",
  };

  const handleRecentSelected = () => {
    if (selected.popular) {
      setSelected({
        recent: true,
        popular: false,
      });
    }
    setDefaultList("recent");
  };
  const handlePopularSelected = () => {
    if (selected.recent) {
      setSelected({
        recent: false,
        popular: true,
      });
    }
    setDefaultList("popular");
  };

  const renderLeftContainer = () => {
    if (requiredLoading) {
      return (
        <div className="col-12 g-0 p-0 m-0">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="grow" />
          </div>
        </div>
      );
    } else {
      if (requiredError) {
        <div className="col-12 g-0 p-0 m-0">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {requiredError}
          </div>
        </div>;
      } else {
        return (
          <div>
            {watchUrls &&
              watchUrls.map((m, index) => (
                <div className= "row g-0 p-0 mt-2" key={index}>
                  <div className="col-12 g-0 p-0 m-0">
                    <MDBContainer className="text-center">
                      <MDBIframe src={m.movieUrl} />
                    </MDBContainer>
                  </div>
                </div>
              ))}
          </div>
        );
      }
    }
  };
  const renderDetails = () => {
    if (requiredMovie) {
      const {
        title,
        language,
        year,
        producedby,
        uploadImageUrl,
        views,
        plotoutline,
        category,
        actor,
        ratingValue,
        length,
      } = requiredMovie;
      return (
        <div className="row g-0 m-0 p-0" style={{ color: "white",fontWeight:"bold" }}>
          <div className={isMobile?"col-12":"col-6"} style={{ marginLeft: "auto", marginRight: "auto",marginTop:"50px" }}>
            <img
              src={uploadImageUrl}
              style={{ width: "100%", height: "200px" }}
            />
          </div>
          <div className={isMobile?"col-12":"col-6"} style={{ marginLeft: "auto", marginRight: "auto",marginTop:"50px" }}>
            <p>
              Title {"-----"}{title}
              <br />
              Language{"-----"}{language}
              <br />
              Year{"-----"} {year}
              <br />
              Produced by {"-----"}{producedby}
              <br />
              Views{"-----"} {views}
              <br />
              Category{"-----"} {category},
              <br />
              Actor{"-----"}{actor},
              <br />
              RatingValue{"-----"} {ratingValue},
              <br />
              Length {"-----"}{length}
            </p>
          </div>
          <div className="col-12">{plotoutline}</div>
        </div>
      );
    }
  };
  const renderRightContainer = () => {
    if (recentOrPopularLoading) {
      return <div>loading...</div>;
    } else {
      if (recentOrPopularError) {
        return <div>recentOrPopularError</div>;
      } else {
        return (
          <div>
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "2px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className="col-12 g-0 p-0 m-0"
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    onClick={handleRecentSelected}
                    variant={
                      selected.recent ? "btn btn-primary" : "btn btn-info"
                    }
                    style={selected.recent ? seletedCss : UnseletedCss}
                  >
                    Recent Movies{" "}
                  </Button>
                  <Button
                    onClick={handlePopularSelected}
                    variant={
                      selected.popular ? "btn btn-primary" : "btn btn-info"
                    }
                    style={selected.popular ? seletedCss : UnseletedCss}
                  >
                    Popular Movies{" "}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  borderBottom: "1px solid yellow",
                  borderLeft: "1px solid yellow",
                  borderRight: "1px solid yellow",
                  backgroundColor: "#212529",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {recentOrPopularMovies.length > 0 &&
                  recentOrPopularMovies.map((m, index) => (
                    <div
                      className="col-12 g-0 p-0 m-0"
                      style={{ backgroundColor: "#212529", overflow: "hidden" }}
                      key={m.id}
                    >
                      {" "}
                      <LinkGenerator post2 data={m} />
                    </div>
                  ))}
              </div>
              <div
                className="col-12 g-0 p-0 m-0"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <button onClick={prevPage}>Prev</button>
                <button onClick={nextPage}>Next</button>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  if (requiredLoading) {
    return (
      <Layout left={renderLeftContainer()} right={renderRightContainer()}>
        <div>loading...</div>
      </Layout>
    );
  } else {
    return (
      <Layout
        left={renderLeftContainer()}
        right={renderRightContainer()}
        bottom={renderDetails()}
      >
        {requiredMovie && (
          <p style={{ color: "white" }}>
            {requiredMovie.title}
            {"-"}
            {requiredMovie.year}
            {"-"}
            {requiredMovie.language}
            {"-"}
            {requiredMovie.producedby}
            {"-"} watch online free download
          </p>
        )}
      </Layout>
    );
  }
};

export default Details;
