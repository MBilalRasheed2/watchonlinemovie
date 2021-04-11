import {  FILTER_CONSTATNS } from "../action/constants";

const intialState = {
  error: null,
  loading: false,
  filterMovies: [],
  lastDoc:null,
};

const filterReducer = (state = intialState, action) => {
  switch (action.type) {
    case FILTER_CONSTATNS.FILTER_CONSTATNS_REQUEST:
      {
        state = {
          ...state,
          loading: true,
          error: null,
          filterMovies: [],
          lastDoc:null,
        };
      }
      break;
    case FILTER_CONSTATNS.FILTER_CONSTATNS_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
          filterMovies: action.payload.movies,
          lastDoc:action.payload.lastDoc,
          error: null,
        };
      }
      break;
    case FILTER_CONSTATNS.FILTER_CONSTATNS_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
          filterMovies: [],
          lastDoc:null
        };
      }
      break;
  }
  return state;
};

export default filterReducer;
