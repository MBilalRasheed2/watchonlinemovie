import firebase from "firebase";
import {
  ALL_MOVIE_CONSTATNS,
  REQUIRED_MOVIE,
  FILTER_CONSTATNS,
  HIGHVIEWED_CONSTATNS,
  RECENT_OR_POPULAR_CONSTANTS,
} from "./constants";

export const loadMovies = (lastDoc, condition) => {
  return async (dispatch) => {
    let movies = [];
    let last;

    dispatch({
      type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_REQUEST,
    });
    const db = firebase.firestore();

    if (lastDoc) {
      if (condition === "prev") {
        const collection = await db
          .collection("movies")
          .orderBy("id", "desc")
          .endBefore(lastDoc.data().id)
          .limitToLast(20)
          .get()
          .then((collection) => {
            movies = collection.docs.map((doc) => doc.data());
            last = collection.docs[collection.docs.length - 1];
          });
      } else if (condition === "next") {
        const collection = await db
          .collection("movies")
          .orderBy("id", "desc")
          .limit(20)
          .startAfter(lastDoc.data().id)
          .get()
          .then((collection) => {
            movies = collection.docs.map((doc) => doc.data());
            last = collection.docs[collection.docs.length - 1];
          });
      }
    } else {
      const collection = await db
        .collection("movies")
        .orderBy("id", "desc")
        .limit(20)
        .get()
        .then((collection) => {
          movies = collection.docs.map((doc) => doc.data());
          last = collection.docs[collection.docs.length - 1];
        });
    }
    if (movies && movies.length > 0) {
      dispatch({
        type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_SUCCESS,
        payload: { movies, lastDoc: last },
      });
    } else {
      if (!movies && movies.length === 0) {
        if (!movies) {
          dispatch({
            type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_SUCCESS,
            payload: "something is wrong",
          });
          return;
        }
        if (movies && movies.length === 0) {
          dispatch({
            type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_SUCCESS,
            payload: "movie not found",
          });
          return;
        }
      }
    }
  };
};

export const recentOrPopularMovies = (parameter, lastDoc, condition) => {
  return async (dispatch) => {
    let single;
    let oldArray = [];
    let newArray = [];
    let last;
    let collRef;

    dispatch({
      type: RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_REQUEST,
    });

    const db = firebase.firestore();
    if (lastDoc) {
      if (condition === "next") {
        if (parameter === "recent") {
          collRef = await db
            .collection("movies")
            .orderBy("timestamp", "desc")
            .startAfter(lastDoc.timestamp)
            .limit(5)
            .get();
        } else {
          collRef = await db
            .collection("movies")
            .orderBy("ratingValue", "desc")
            .startAfter(lastDoc.ratingValue)
            .limit(5)
            .get();
        }
      } else if (condition === "prev") {
        if (parameter === "recent") {
          collRef = await db
            .collection("movies")
            .orderBy("timestamp", "desc")
            .endBefore(lastDoc.timestamp)
            .limitToLast(5)
            .get();
        } else {
          collRef = await db
            .collection("movies")
            .orderBy("ratingValue", "desc")
            .endBefore(lastDoc.ratingValue)
            .limitToLast(5)
            .get();
        }
      }
    } else {
      if (parameter === "recent") {
        collRef = await db
          .collection("movies")
          .orderBy("timestamp", "desc")
          .limit(5)
          .get();
      } else {
        collRef = await db
          .collection("movies")
          .orderBy("ratingValue", "desc")
          .limit(5)
          .get();
      }
    }

    if (!collRef || collRef.empty) {
      if (!collRef) {
        dispatch({
          type: RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_FAILURE,
          payload: "something is wrong",
        });
        return;
      }
      if (collRef.empty) {
        dispatch({
          type: RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_FAILURE,
          payload: "movies not found",
        });
        return;
      }

     
    }

    if (collRef) {
      collRef.forEach((movie) => {
        oldArray = newArray;
        single = movie.data();
        newArray = [...oldArray, single];
      });
      last = collRef.docs[collRef.docs.length - 1].data();
      dispatch({
        type: RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_SUCCESS,
        payload: { movies: newArray, lastDoc: last },
      });
    }
  };
};
export const mostViewedMoviesInMonthMovies = (lastDoc, condition) => {
  return async (dispatch) => {
    let single;
    let oldArray = [];
    let newArray = [];
    dispatch({ type: HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_REQUEST });
    const db = firebase.firestore();
    let collRef;
    let last;
    if (lastDoc) {
      if (condition === "next") {
        collRef = await db
          .collection("movies")
          .orderBy("id", "desc")
          .startAfter(lastDoc.id)
          .limit(5)
          .get();
      } else if (condition === "prev") {
        collRef = await db
          .collection("movies")
          .orderBy("id", "desc")
          .endBefore(lastDoc.id)
          .limitToLast(5)
          .get();
      }
    } else {
      collRef = await db
        .collection("movies")
        .orderBy("id", "desc")
        .limit(5)
        .get();
    }

    if (!collRef || collRef.empty) {
      if (!collRef) {
        dispatch({
          type: HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_FAILURE,
          payload: "something is wrong",
        });
        return;
      }
      if (collRef.empty) {
        dispatch({
          type: HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_FAILURE,
          payload: "movies not found",
        });
        return;
      }
    }

    if (collRef) {
      const month = new Date().getMonth();
      collRef.forEach((movie) => {
        oldArray = newArray;
        single = movie.data();
        let com = new Date(single.timestamp).getMonth() + 1;

        if (com >= month) {
          newArray = [...oldArray, single];
        }
        last = collRef.docs[collRef.docs.length - 1].data();
      });

      dispatch({
        type: HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_SUCCESS,
        payload: { movies: newArray, lastDoc: last },
      });
    }
  };
};

export const requiredMovie = (id) => {
  return async (dispatch) => {
    try {
      if (id) {
        dispatch({
          type: REQUIRED_MOVIE.REQUIRED_MOVIE_REQUEST,
        });
        const db = firebase.firestore();
        const docRef = await db
          .collection("movies")
          .where("id", "==", id)
          .get();
        if (!docRef) {
          dispatch({
            type: REQUIRED_MOVIE.REQUIRED_MOVIE_FALURE,
            payload: "movie not found",
          });
          return;
        }

        if (docRef.docs.length > 0) {
          const doc = docRef.docs[docRef.docs.length - 1].data();
          dispatch({
            type: REQUIRED_MOVIE.REQUIRED_MOVIE_SUCCESS,
            payload: doc,
          });
        } else {
          dispatch({
            type: REQUIRED_MOVIE.REQUIRED_MOVIE_FALURE,
            payload: "something is wrong",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterMovie = (parameter, value) => {
  return async (dispatch) => {
    if (value !== "home") {
      dispatch({
        type: FILTER_CONSTATNS.FILTER_CONSTATNS_REQUEST,
      });

      const db = firebase.firestore();
      await db
        .collection("movies")
        .where(parameter, "==", value)
        .get()
        .then((snap) => {
          if (snap.empty) {
            dispatch({
              type: FILTER_CONSTATNS.FILTER_CONSTATNS_FAILURE,
              payload: "FILTER_CONSTATNS_FAILURE movies not found",
            });
            return;
          }
          let single;
          let oldArray = [];
          let newArray = [];

          snap.forEach((movie) => {
            oldArray = newArray;
            single = movie.data();
            newArray = [...oldArray, single];
          });
          dispatch({
            type: FILTER_CONSTATNS.FILTER_CONSTATNS_SUCCESS,
            payload: { movies: newArray },
          });
        });
    }
  };
};

export const searchMovieByTitle = (value) => {
  return async (dispatch) => {
    let movies = [];

    dispatch({
      type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_REQUEST,
    });
    const db = firebase.firestore();
    await db
      .collection("movies")
      .where("title", "==", value)
      .get()
      .then((snap) => {
        if (snap.empty) {
          dispatch({
            type: ALL_MOVIE_CONSTATNS.LOADED_MOVIES_ALL_FALURE,
            payload: "Movie not found",
          });
        } else {
          movies = snap.docs.map((doc) => doc.data());
        }
      });

    if (movies.length > 0) {
      dispatch({
        type: ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_SUCCESS,
        payload: { movies: movies, lastDoc: null },
      });
    }
  };
};
