import ActionTypes from "./constants";

const Actions = {
  startFetching: () => ({ type: ActionTypes.START_FETCHING }),
  stopFetching: () => ({ type: ActionTypes.STOP_FETCHING }),
  showToast: toastConfig => ({
    type: ActionTypes.SHOW_TOAST,
    payload: toastConfig
  }),
  clearToast: () => ({ type: ActionTypes.CLEAR_TOAST })
};

export default Actions;
