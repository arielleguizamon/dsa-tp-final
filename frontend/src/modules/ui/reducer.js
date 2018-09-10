import ActionTypes from "./constants";

const initialState = {
  fetching: false,
  toast: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_FETCHING:
      return {
        ...state,
        fetching: true
      };
    case ActionTypes.STOP_FETCHING:
      return {
        ...state,
        fetching: false
      };
    case ActionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: action.payload
      };
    case ActionTypes.CLEAR_TOAST:
      return {
        ...state,
        toast: {}
      };
    default:
      return state;
  }
};
