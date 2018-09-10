import React, { Component } from "react";
import { Button, Card, CardBody, CardGroup, Row, Col } from "reactstrap";
import { AnonymousLayout } from "../../containers";
import { required, minLength } from "../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../lib/forms/utils";
import { compose } from "ramda";
import { NavLink, Link } from "react-router-dom";
import InputGroup from "../../components/InputGroup";

class Login extends Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);

    this.state = {
      formLogin: {
        username: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(5),
            required()
          )
        },
        password: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(5),
            required()
          )
        }
      }
    };

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formLoginSubmit = this.formLoginSubmit.bind(this);
  }

  formLoginSubmit() {
    if (this.validateForm("formLogin")) {
      this.props
        .makeRequest(
          {
            method: "POST",
            url: "/login",
            data: {
              username: this.state.formLogin.username.value,
              password: this.state.formLogin.password.value
            }
          },
          true,
          false
        )
        .then(response => {
          this.props.setUser(response.data);
          this.props.history.push("/equipos");
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formLogin", errors.response.data);
          }
        });
    }
  }

  render() {
    return (
      <AnonymousLayout md={8}>
        <CardGroup>
          <Card className="p-4">
            <CardBody>
              <h1>Login</h1>
              <p className="text-muted">Ingrese a su cuenta</p>

              <InputGroup
                type="text"
                placeholder="Usuario"
                onChange={this.updateForm("formLogin", "username")}
                onBlur={this.validateField("formLogin", "username")}
                errors={this.state.formLogin.username.errors}
                icon={"fa fa-user-o"}
              />

              <InputGroup
                type="password"
                placeholder="Password"
                onChange={this.updateForm("formLogin", "password")}
                onBlur={this.validateField("formLogin", "password")}
                errors={this.state.formLogin.password.errors}
                icon={"fa fa-lock"}
              />

              <Row>
                <Col xs="4">
                  <Button
                    color="primary"
                    className="px-4"
                    onClick={this.formLoginSubmit}
                  >
                    Login
                  </Button>
                </Col>
                <Col xs="8" className="text-right">
                  <Button color="link" className="px-0">
                    <Link to={"/recuperacion-step-1"}>
                      Recuperación de Contraseña
                    </Link>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card
            className="text-white bg-primary py-5 d-md-down-none"
            style={{ width: `${44}%` }}
          >
            <CardBody className="text-center">
              <div>
                <h2>Registrese</h2>
                <p>
                  Cree su usuario para participar de este evento super duper
                </p>
                <NavLink to={"/registro"}>
                  <Button color="primary" className="mt-3" active>
                    Registrarme!
                  </Button>
                </NavLink>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
      </AnonymousLayout>
    );
  }
}

export default Login;
