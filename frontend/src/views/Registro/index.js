import Registro from "./Registro";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { makeRequest } from "../../modules/api/actions";

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
  )(Registro)
);
