import { REQUIRED_MOVIE } from "../action/constants";
const initialState = {
  error: null,
  movie: {},
  loading: false,
};

const singleMovie = (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_MOVIE.REQUIRED_MOVIE_REQUEST: {
      state = {
        ...state,
        loading: true,
      
      };
    }
    break;
    case REQUIRED_MOVIE.REQUIRED_MOVIE_SUCCESS: {
      state = {
        ...state,
        movie: action.payload,
        loading: false,
       
      };
    }
    break;
    case REQUIRED_MOVIE.REQUIRED_MOVIE_FALURE: {
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    break;
  }
 
  return state;
};

export default singleMovie;
