import Equipos from "./Equipos";
import { connect } from "react-redux";
import { makeRequest } from "../../../modules/api/actions";
import { withRouter } from "react-router";

const mapDispatchToProps = dispatch => {
  return {
    makeRequest: (request, fetching, toast) =>
      dispatch(makeRequest(request, fetching, toast))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Equipos)
);
