import reduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware,createStore } from "redux";
import rootReducer from './reducer';
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));


export default store;