import ActionTypes from "./constants";
import UIActions from "../ui/actions";
import httpClient from "../../lib/http/client";

const Actions = {
  request: config => ({ type: ActionTypes.REQUEST, payload: config }),
  success: response => ({ type: ActionTypes.SUCCESS, payload: response }),
  failure: error => ({ type: ActionTypes.FAILURE, payload: error })
};

export function makeRequest(
  requestConfig,
  showFetching = true,
  showToast = true
) {
  //mejorar el show toast para elegir si success error or both
  return dispatch => {
    dispatch(Actions.request(requestConfig));
    dispatch(UIActions.startFetching());

    return httpClient
      .request(requestConfig)
      .then(response => {
        dispatch(Actions.success(response));

        if (showFetching) {
          dispatch(UIActions.stopFetching());
        }
        if (showToast && response) {
          dispatch(
            UIActions.showToast({ message: "Acción exitosa", type: "success" })
          );
        }

        return response;
      })
      .catch(error => {
        dispatch(Actions.failure(error));

        if (showFetching) {
          dispatch(UIActions.stopFetching());
        }
        if (showToast && error.response) {
          dispatch(
            UIActions.showToast({
              message: "Acción fallida",
              type: "error"
            })
          );
        }

        throw error;
      });
  };
}

export default Actions;
