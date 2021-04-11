import { ALL_MOVIE_CONSTATNS, FILTER_CONSTATNS } from "../action/constants";

const intialState = {
  error: null,
  loading: false,
  movies: [],
  lastDoc: {},
};

const movieReducer = (state = intialState, action) => {
  switch (action.type) {
    case ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_REQUEST:
      {
        state = {
          ...state,
          loading: true,
          error: null,
          movies: [],
        };
      }
      break;
    case ALL_MOVIE_CONSTATNS.LOAD_MOVIES_ALL_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
          movies: action.payload.movies,
          lastDoc: action.payload.lastDoc,
          error: null,
        };
      }
      break;
    case ALL_MOVIE_CONSTATNS.LOADED_MOVIES_ALL_FALURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
          movies: [],
          lastDoc: {},
         
        };
      }
      break;
  }
  return state;
};

export default movieReducer;
