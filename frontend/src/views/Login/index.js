import Login from "./Login";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { makeRequest } from "../../modules/api/actions";
import SessionActions from "../../modules/session/actions";

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(SessionActions.setUser(user)),
    makeRequest: (request, fetching, toast) =>
      dispatch(makeRequest(request, fetching, toast))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
