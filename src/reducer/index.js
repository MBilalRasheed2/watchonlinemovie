import { combineReducers } from "redux";
import movieReducer from './movieReducer'
import singleMovie from './singleMovie'
import operationReducer from './operationReducer'
import otherMovieReducer from './otherMovieReducer'
import recentPopular from './recentPopularReducer'
import filterReducer from './filterReducer'
const rootReducer = combineReducers({
  movies: movieReducer,
  movie:singleMovie,
  other:otherMovieReducer,
  operation:operationReducer,
  recentOrPopular:recentPopular,
  filter:filterReducer
});

export default rootReducer;