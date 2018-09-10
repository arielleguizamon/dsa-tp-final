import Step1Original from "./Step1";
import Step2Original from "./Step2";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { makeRequest } from "../../modules/api/actions";

const mapDispatchToProps = dispatch => {
  return {
    makeRequest: (request, fetching, toast) =>
      dispatch(makeRequest(request, fetching, toast))
  };
};

const Step1 = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Step1Original)
);
const Step2 = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Step2Original)
);

export { Step1, Step2 };
