import { OPERATION_CONSTATNS } from "../action/constants";
const intialData = {
  loading: false,
  error: null,
  size:0,
  actors:[],
  titles:[]
};

const operation = (state = intialData, action) => {
  switch (action.type) {
    case OPERATION_CONSTATNS.LOAD_OPERATION_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
    case OPERATION_CONSTATNS.LOAD_OPERATION_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
          actors: action.payload.actors,
          titles: action.payload.titles,
          size: action.payload.size,
        };
      }
      break;
    case OPERATION_CONSTATNS.LOAD_OPERATION_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
          size:0,
          actors:[],
          titles:[]
        };
      }
      break;
  }
  return state;
};

export default operation;
