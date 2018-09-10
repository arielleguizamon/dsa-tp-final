import ActionTypes from "./constants";

const Actions = {
  setUser: user => ({ type: ActionTypes.SET_USER, payload: user })
};

export default Actions;
