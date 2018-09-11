import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { AnonymousLayout } from "../../containers";
import { required, minLength, email } from "../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../lib/forms/utils";
import { compose } from "ramda";
import InputGroup from "../../components/InputGroup";
import { Link } from "react-router-dom";

class Registro extends Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);

    this.state = {
      formRegistro: {
        nombre: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(3),
            required()
          )
        },
        apellido: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(3),
            required()
          )
        },
        email: {
          value: undefined,
          errors: undefined,
          validate: compose(
            email(),
            required()
          )
        },
        username: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(3),
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
    this.formRegistroSubmit = this.formRegistroSubmit.bind(this);
  }

  formRegistroSubmit() {
    if (this.validateForm("formRegistro")) {
      this.props
        .makeRequest(
          {
            method: "POST",
            url: "/users",
            data: {
              nombre: this.state.formRegistro.nombre.value,
              apellido: this.state.formRegistro.apellido.value,
              email: this.state.formRegistro.email.value,
              username: this.state.formRegistro.username.value,
              password: this.state.formRegistro.password.value
            }
          },
          true,
          false
        )
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formRegistro", errors.response.data);
          }
        });
    }
  }

  render() {
    return (
      <AnonymousLayout>
        <Card className="mx-4">
          <CardBody className="p-4">
            <h1>Registro de Usuario</h1>
            <p className="text-muted">Complete el formulario</p>

            <InputGroup
              type="text"
              placeholder="Nombre"
              onChange={this.updateForm("formRegistro", "nombre")}
              onBlur={this.validateField("formRegistro", "nombre")}
              errors={this.state.formRegistro.nombre.errors}
              icon={"fa fa-user-o"}
            />

            <InputGroup
              type="text"
              placeholder="Apellido"
              onChange={this.updateForm("formRegistro", "apellido")}
              onBlur={this.validateField("formRegistro", "apellido")}
              errors={this.state.formRegistro.apellido.errors}
              icon={"fa fa-user-o"}
            />

            <InputGroup
              type="text"
              placeholder="Email"
              onChange={this.updateForm("formRegistro", "email")}
              onBlur={this.validateField("formRegistro", "email")}
              errors={this.state.formRegistro.email.errors}
              icon={"fa fa-envelope-o"}
            />

            <InputGroup
              type="text"
              placeholder="Username"
              onChange={this.updateForm("formRegistro", "username")}
              onBlur={this.validateField("formRegistro", "username")}
              errors={this.state.formRegistro.username.errors}
              icon={"fa fa-user-o"}
            />

            <InputGroup
              type="password"
              placeholder="Password"
              onChange={this.updateForm("formRegistro", "password")}
              onBlur={this.validateField("formRegistro", "password")}
              errors={this.state.formRegistro.password.errors}
              icon={"fa fa-lock"}
            />

            <Button color="success" block onClick={this.formRegistroSubmit}>
              Registrarme
            </Button>

            <Row>
              <Col className="text-center">
                <Button color="link" className="px-0">
                  <Link to={"/login"}>Volver</Link>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </AnonymousLayout>
    );
  }
}

export default Registro;
