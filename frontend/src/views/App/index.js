import App from "./App";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UIActions from "../../modules/ui/actions";

const mapStateToProps = state => {
  return {
    fetching: state.ui.fetching,
    toast: state.ui.toast
  };
};

const mapDispatchToProps = {
  clearToast: () => UIActions.clearToast()
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
