import Crear from "./Crear";
import { connect } from "react-redux";
import { makeRequest } from "../../../modules/api/actions";
import SessionActions from "../../../modules/session/actions";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(SessionActions.setUser(user)),
    makeRequest: (request, fetching, toast) =>
      dispatch(makeRequest(request, fetching, toast))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Crear)
);
