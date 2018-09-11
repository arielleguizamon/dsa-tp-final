export const REDUCER_KEY = "ui";

const prefix = "UI/";

const ActionTypes = {
  START_FETCHING: prefix + "START_FETCHING",
  STOP_FETCHING: prefix + "STOP_FETCHING",
  SHOW_TOAST: prefix + "SHOW_TOAST",
  CLEAR_TOAST: prefix + "CLEAR_TOAST"
};

export default ActionTypes;
