import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { AnonymousLayout } from "../../containers";
import { required, email } from "../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../lib/forms/utils";
import { compose } from "ramda";
import InputGroup from "../../components/InputGroup";
import { Link } from "react-router-dom";

class Step1 extends Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);

    this.state = {
      formStep1: {
        email: {
          value: undefined,
          errors: undefined,
          validate: compose(
            email(),
            required()
          )
        }
      }
    };

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formStep1Submit = this.formStep1Submit.bind(this);
  }

  formStep1Submit() {
    if (this.validateForm("formStep1")) {
      this.props
        .makeRequest(
          {
            method: "POST",
            url: "/usuario/recover",
            data: {
              email: this.state.formStep1.email.value
            }
          },
          true,
          true
        )
        .then(() => {
          this.props.history.push("/recuperacion-step-2", {
            email: this.state.formStep1.email.value
          });
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formStep1", errors.response.data);
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
              onChange={this.updateForm("formStep1", "email")}
              onBlur={this.validateField("formStep1", "email")}
              errors={this.state.formStep1.email.errors}
              icon={"fa fa-envelope-o"}
            />

            <Button color="success" block onClick={this.formStep1Submit}>
              Enviar email
            </Button>

            <Row>
              <Col className="text-center">
                <Button color="link" className="px-0">
                  <Link to={"/recuperacion-step-2"}>Ya tengo el token!</Link>
                </Button>
              </Col>
            </Row>

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

export default Step1;
