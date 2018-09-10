import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import { Button, Row, Col } from "reactstrap";
import { required, minLength } from "../../../lib/forms/validators";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../../lib/forms/utils";
import { compose } from "ramda";
import InputGroup from "../../../components/InputGroup";

export default class Crear extends React.Component {
  updateForm;
  validateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);
    this.state = {
      formEquipo: {
        nombre: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(3),
            required()
          )
        },
        organizacion: {
          value: undefined,
          errors: undefined,
          validate: compose(
            minLength(3),
            required()
          )
        }
      }
    };

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formEquipoSubmit = this.formEquipoSubmit.bind(this);
  }

  formEquipoSubmit() {
    if (this.validateForm("formEquipo")) {
      this.props
        .makeRequest(
          {
            method: "POST",
            url: "/teams",
            headers: {
              Authorization: "JWT " + this.props.user.token
            },
            data: {
              nombre: this.state.formEquipo.nombre.value,
              organizacion: this.state.formEquipo.organizacion.value
            }
          },
          true,
          true
        )
        .then(response => {
          this.props.setUser({
            ...this.props.user,
            equipo: response.data
          });
          this.props.history.push("/equipos");
        })
        .catch(errors => {
          if (errors.response) {
            this.populateErrors("formEquipo", errors.response.data);
          }
        });
    }
  }

  render() {
    return (
      <DefaultCard xs={6}>
        <h2>Registro de Equipo</h2>
        <p className="text-muted">Complete el formulario</p>

        <InputGroup
          type="text"
          placeholder="Nombre"
          onChange={this.updateForm("formEquipo", "nombre")}
          onBlur={this.validateField("formEquipo", "nombre")}
          errors={this.state.formEquipo.nombre.errors}
        />
        <InputGroup
          type="text"
          placeholder="Organización"
          onChange={this.updateForm("formEquipo", "organizacion")}
          onBlur={this.validateField("formEquipo", "organizacion")}
          errors={this.state.formEquipo.organizacion.errors}
        />
        <Row>
          <Col className="text-right">
            <Button color="success" onClick={this.formEquipoSubmit}>
              Crear
            </Button>
          </Col>
        </Row>
      </DefaultCard>
    );
  }
}
