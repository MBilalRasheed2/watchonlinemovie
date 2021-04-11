import firebase from "firebase";
import { OPERATION_CONSTATNS } from "./constants";
export const operationLoad = () => {
  return async (dispatch) => {
    dispatch({
      type: OPERATION_CONSTATNS.LOAD_OPERATION_REQUEST,
    });
    const db = firebase.firestore();
    let size;
    let actors;
    let titles;
    await db
      .collection("movies")
      .get()
      .then((snap) => {
        size = parseInt(snap.size);
        actors = snap.docs.map((doc) => doc.data().actor);
        titles = snap.docs.map((doc) => doc.data().title);
      });

    if (size && actors) {
      dispatch({
        type: OPERATION_CONSTATNS.LOAD_OPERATION_SUCCESS,
        payload: {
          size: size,
          actors: actors,
          titles: titles,
        },
      });
    } else {
      dispatch({
        type: OPERATION_CONSTATNS.LOAD_OPERATION_FAILURE,
        payload: "something is wrong",
      });
    }
  };
};
