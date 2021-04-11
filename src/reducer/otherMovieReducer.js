import { HIGHVIEWED_CONSTATNS } from "../action/constants";

const intialState = {
  movies: [],
  error: null,
  loading: false,
  lastDoc:null
};

const otherMovie = (state = intialState, action) => {
  switch (action.type) {
    case HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_REQUEST:
      {
        state = {
          ...state,
          loading: true,
          error: null,
          movies: [],
          lastDoc:null
        };
      }
      break;
    case HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
          movies: action.payload.movies,
          error: null,
          lastDoc:action.payload.lastDoc
        };
      }
      break;
    case HIGHVIEWED_CONSTATNS.HIGHVIEWED_CONSTATNS_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
          movies: [],
          lastDoc:null
        };
      }
      break;
  }
  return state;
};

export default otherMovie;
