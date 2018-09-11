import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { AnonymousLayout } from "../../containers";
import { required, length, minLength, email } from "../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../lib/forms/utils";
import { compose } from "ramda";
import InputGroup from "../../components/InputGroup";
import { Link } from "react-router-dom";

class Step2 extends Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);

    this.state = {
      formStep2: {
        email: {
          value:
            (props.location.state && props.location.state.email) || undefined,
          errors: undefined,
          validate: compose(
            email(),
            required()
          )
        },
        token: {
          value: undefined,
          errors: undefined,
          validate: compose(
            length(6),
            required()
          )
        },
        password: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(8),
            required()
          )
        }
      }
    };

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formStep2Submit = this.formStep2Submit.bind(this);
  }

  formStep2Submit() {
    if (this.validateForm("formStep2")) {
      this.props
        .makeRequest(
          {
            method: "POST",
            url: "/usuario/reset",
            data: {
              email: this.state.formStep2.email.value,
              token: this.state.formStep2.token.value,
              password: this.state.formStep2.password.value
            }
          },
          true,
          true
        )
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formStep2", errors.response.data);
          }
        });
    }
  }

  render() {
    return (
      <AnonymousLayout>
        <Card className="mx-4">
          <CardBody className="p-4">
            <h1>Recuperación de Contraseña</h1>
            <p className="text-muted">Complete el formulario</p>

            <InputGroup
              type="text"
              placeholder="Email"
              onChange={this.updateForm("formStep2", "email")}
              onBlur={this.validateField("formStep2", "email")}
              value={this.state.formStep2.email.value}
              errors={this.state.formStep2.email.errors}
              icon={"fa fa-envelope-o"}
            />

            <InputGroup
              type="text"
              placeholder="Token"
              onChange={this.updateForm("formStep2", "token")}
              onBlur={this.validateField("formStep2", "token")}
              errors={this.state.formStep2.token.errors}
              icon={"fa fa-tag"}
            />

            <InputGroup
              type="password"
              placeholder="Password"
              onChange={this.updateForm("formStep2", "password")}
              onBlur={this.validateField("formStep2", "password")}
              errors={this.state.formStep2.password.errors}
              icon={"fa fa-lock"}
            />

            <Button color="success" block onClick={this.formStep2Submit}>
              Reiniciar contraseña
            </Button>
            <Row>
              <Col className="text-center">
                <Button color="link" className="px-0">
                  <Link to={"/recuperacion-step-1"}>Volver</Link>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </AnonymousLayout>
    );
  }
}

export default Step2;
