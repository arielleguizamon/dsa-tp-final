import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../../scss/style.css";

// Containers
import { DefaultLayout } from "../../containers";
// Pages
import { Page404, Page500 } from "../Pages";
import Login from "../Login";
import Registro from "../Registro";
import { Step1, Step2 } from "../RecuperacionPassword";
import Overlay from "../../components/Overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// import { renderRoutes } from 'react-router-config'

class App extends Component {
  componentWillReceiveProps(props) {
    const { message, ...toastConfig } = props.toast;
    if (message) {
      toast(message, toastConfig);
      this.props.clearToast();
    }
  }

  render() {
    return (
      <div>
        <Overlay active={this.props.fetching} />
        <ToastContainer autoClose={3000} newestOnTop={true} />
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route
            exact
            path="/registro"
            name="Registro de usuario"
            component={Registro}
          />
          <Route
            exact
            path="/recuperacion-step-1"
            name="Recuperacion de Password Step 1"
            component={Step1}
          />
          <Route
            exact
            path="/recuperacion-step-2"
            name="Recuperacion de Password Step 2"
            component={Step2}
          />
          {this.props.user &&
            this.props.user.token && (
              <Route path="/" name="Home" component={DefaultLayout} />
            )}
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default App;
