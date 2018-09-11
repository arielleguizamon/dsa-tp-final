import Unirse from "./Unirse";
import { connect } from "react-redux";
import { makeRequest } from "../../../modules/api/actions";
import { withRouter } from "react-router";
import SessionActions from "../../../modules/session/actions";

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
  )(Unirse)
);
