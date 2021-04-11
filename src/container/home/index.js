import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Layout from "../../component/layout";

import LinkGenerator from "../../component/LinkGenerator";
import GeneralPage from "../../component/GeneralPage";
import SearchMovie from "../../component/SearchMovie";
import * as home from "../../action/home";
import * as operationAction from "../../action/operation";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Pagination, Form, Button, ListGroup } from "react-bootstrap";

const Home = (props) => {
  const parameter = props.match.params.main ? props.match.params.main : null;

  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies);
  const filterMovies = useSelector((state) => state.filter);
  const other = useSelector((state) => state.other);
  const operation = useSelector((state) => state.operation);

  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [mostViewedMovies, setMostViewedMovies] = useState([]);
  const [mostViewedLoading, setMostViewedLoading] = useState(false);
  const [mostViewedError, setMostViewedError] = useState(null);
  const [paginateData, setPaginateData] = useState(null);
  const [paginateMostViewed, setPaginateMostViewed] = useState(null);

  const [operationloading, setOperationLoading] = useState(false);
  const [operationData, setOperationData] = useState(null);
  const [operationTitle, setOperationTitle] = useState(null);
  const [operationError, setOperationError] = useState(null);
  const [currentPage, setCurrentPage] = useState(20);
  const [mCurrentPage, setMCurrentPage] = useState(5);
  const [lastPage, setLastPage] = useState(null);
  const [condition, setCondition] = useState(null);
  const [mCondition, setMCondition] = useState(null);
  const [titleList, setTitleList] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    dispatch(home.loadMovies(paginateData, null));
    dispatch(home.mostViewedMoviesInMonthMovies(paginateMostViewed, null));
    dispatch(operationAction.operationLoad());
  }, []);
  useEffect(() => {
    if (searchMovie !== "") {
      dispatch(home.searchMovieByTitle(searchMovie));
    }
  }, [searchMovie]);
  useEffect(() => {
    dispatch(home.loadMovies(paginateData, condition));
    dispatch(home.mostViewedMoviesInMonthMovies(paginateMostViewed, null));
    dispatch(operationAction.operationLoad());
  }, [currentPage]);
  useEffect(() => {
    dispatch(
      home.mostViewedMoviesInMonthMovies(paginateMostViewed, mCondition)
    );
  }, [mCondition]);

  useEffect(() => {
    setOperationLoading(operation.loading);
    setOperationData({ actors: operation.actors });
    setOperationTitle(operation.titles);

    setLastPage(operation.size);
    setOperationError(operation.error);
  }, [operation]);

  useEffect(() => {
    setMostViewedLoading(other.loading);
    setMostViewedMovies(other.movies);
    setMostViewedError(other.error);
    setPaginateMostViewed(other.lastDoc);
  }, [other]);

  useEffect(() => {
    if (filterMovies.filterMovies.length > 0) {
      setMoviesLoading(movie.loading);
      setMovies(filterMovies.filterMovies);
      setPaginateData(filterMovies.lastDoc);
    } else {
      setMoviesLoading(movie.loading);
      setMovies(movie.movies);
      setPaginateData(movie.lastDoc);
    }
    setMoviesError(filterMovies.error);
  }, [filterMovies]);

  useEffect(() => {
    setMoviesLoading(movie.loading);
    setMovies(movie.movies);
    setPaginateData(movie.lastDoc);
    setMoviesError(movie.error);
  }, [movie]);
  useEffect(() => {
    if (parameter) {
      dispatch(home.filterMovie("category", parameter, null, null));
    }
  }, [parameter]);

  const nextPage = () => {
    if (currentPage >= lastPage) {
      alert("this is last Page");
    } else {
      setCurrentPage((prevState) => 20 + prevState);
      setCondition("next");
    }
  };

  const prevPage = () => {
    if (currentPage === 20) {
      alert("this is first Page");
    } else {
      setCurrentPage((prevState) => prevState - 20);

      setCondition("prev");
    }
  };
  const mostViewedPrevPage = () => {
    if (mCurrentPage === 5) {
      alert("this is first Page");
    } else {
      setMCurrentPage((prevState) => prevState - 5);
      setMCondition("prev");
    }
  };
  const mostViewedNextPage = () => {
    if (mCurrentPage >= lastPage) {
      alert("this is last Page");
    } else {
      setMCurrentPage((prevState) => 5 + prevState);
      setMCondition("next");
    }
  };
  const renderPagination = () => {
    return (
      <Pagination>
        <Pagination.First onClick={prevPage} />

        <Pagination.Last onClick={nextPage} />
      </Pagination>
    );
  };
  const renderLeftContainer = () => {
    if (isMobile) {
      return (
        <div>
          {operationloading ? (
            <div>loading</div>
          ) : (
            <div className="row">
              {operationData ? (
                <div className="col-12">
                  <GeneralPage actors={operationData.actors} />
                </div>
              ) : null}
            </div>
          )}

          <div className="row g-0 p-0 m-0">
            {movies &&
              movies.map((m, index) => (
                <div key={m.id} className="col-6  g-0 p-0 m-0" key={m.id}>
                  <LinkGenerator post data={m} />
                </div>
              ))}
          </div>
        </div>
      );
    } else if (!isMobile) {
      return (
        <div>
          {operationloading ? (
            <div>loading</div>
          ) : (
            <div className="row">
              {operationData ? (
                <div className="col-12">
                  <GeneralPage actors={operationData.actors} />
                </div>
              ) : null}
            </div>
          )}
          <div className="row g-0 p-0 m-2 ">
            {movies.map((m, index) => (
              <div className="col-4 g-0 p-0 m-0" key={m.id}>
                <LinkGenerator post data={m} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };
  const renderRightContainer = () => {
    if (mostViewedLoading) {
      return (
        <div style={{ color: "white", backgroundColor: "#1F3044" }}>
          loading
        </div>
      );
    } else {
      if (!mostViewedError) {
        return (
          <div
            className="row g-0 p-0 m-1 "
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="col-12 g-0 p-0 m-0">
              <h6 style={{ color: "white", backgroundColor: "#1F3044" }}>
                MOST VIEWED MOVIES THE MONTH
              </h6>
              {mostViewedMovies &&
                mostViewedMovies.map((m, index) => (
                  <div key={m.id}>
                    <LinkGenerator post2 data={m} />
                  </div>
                ))}
              <div
                className="col-12 g-0 p-0 m-0"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <button onClick={mostViewedPrevPage}>Prev</button>
                <button onClick={mostViewedNextPage}>Next</button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ color: "white", backgroundColor: "#1F3044" }}>
            {mostViewedError}
          </div>
        );
      }
    }
  };
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
  if (moviesLoading) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="grow" />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout
        left={renderLeftContainer()}
        right={!isMobile && renderRightContainer()}
        bottom={renderPagination()}
      >
        <div className="row">
          <div className="col-12">
            {moviesError && <div style={{ color: "white" }}>{moviesError}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <h1 style={{ color: "white", fontSize: "2vw" }}>
              LATEST FEATURED MOVIES
            </h1>
          </div>
          <div className="col-6">
          {isMobile ? null : (
            <SearchMovie
              titleList={titleList}
              putSearchInputValue={putSearchInputValue}
              onChangeSerachTerm={onChangeSerachTerm}
            />
          )}
          </div>
          
        </div>
      </Layout>
    );
  }
};

export default Home;
