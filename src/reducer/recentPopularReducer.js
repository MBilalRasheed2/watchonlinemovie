import { RECENT_OR_POPULAR_CONSTANTS } from "../action/constants";

const intialState = {
  movies: [],
  error: null,
  loading: false,
};

const recentPopular = (state = intialState, action) => {
  switch (action.type) {
    case RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_REQUEST:
      {
        state = {
          ...state,
          loading: true,
          error: null,
          movies: [],
        };
      }
      break;
    case RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_SUCCESS:
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
    case RECENT_OR_POPULAR_CONSTANTS.RECENT_OR_POPULAR_CONSTANTS_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
          movies: [],
        };
      }
      break;
  }
  return state;
};

export default recentPopular;
