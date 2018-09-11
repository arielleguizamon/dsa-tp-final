import Listado from "./Listado";
import { connect } from "react-redux";
import { makeRequest } from "../../../modules/api/actions";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeRequest: (request, fetching, toast) =>
      dispatch(makeRequest(request, fetching, toast))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Listado)
);
