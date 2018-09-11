import DefaultLayout from "./DefaultLayout";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import SessionActions from "../../modules/session/actions";

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

const mapDispatchToProps = {
  logout: () => SessionActions.setUser({})
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DefaultLayout)
);
