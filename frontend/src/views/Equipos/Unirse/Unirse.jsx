import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import { Button, Row, Col } from "reactstrap";
import { required, length } from "../../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../../lib/forms/utils";
import { compose } from "ramda";
import InputGroup from "../../../components/InputGroup";

export default class Unirse extends React.Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);
    this.state = {
      formUnirse: {
        token: {
          value: undefined,
          errors: undefined,
          validate: compose(
            length(6),
            required()
          )
        }
      }
    };

    console.log(this.props);

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formUnirseSubmit = this.formUnirseSubmit.bind(this);
  }

  formUnirseSubmit() {
    if (this.validateForm("formUnirse")) {
      this.props
        .makeRequest(
          {
            method: "PUT",
            url: "/equipo/" + this.props.location.state.equipo._id + "/asociar",
            headers: {
              Authorization: "JWT " + this.props.user.token
            },
            data: {
              token: this.state.formUnirse.token.value
            }
          },
          true,
          true
        )
        .then(response => {
          console.log(response);
          this.props.setUser({
            ...this.props.user,
            equipo: response.data
          });
          this.props.history.push("/equipos");
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formUnirse", errors.response.data);
          }
        });
    }
  }

  render() {
    return (
      <DefaultCard xs={6}>
        <h2>Unirse a un Equipo</h2>
        <p className="text-muted">
          Complete el formulario para unirse al equipo
          {" " + this.props.location.state.equipo.nombre}
        </p>

        <InputGroup
          type="text"
          placeholder="Token"
          onChange={this.updateForm("formUnirse", "token")}
          onBlur={this.validateField("formUnirse", "token")}
          errors={this.state.formUnirse.token.errors}
        />

        <Row>
          <Col className="text-right">
            <Button color="success" onClick={this.formUnirseSubmit}>
              Unirse
            </Button>
          </Col>
        </Row>
      </DefaultCard>
    );
  }
}
