import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Table from "../../../components/STable";
import Select from "../../../components/Select";
import { Row, Col, Button } from "reactstrap";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../../lib/forms/utils";
import { required } from "../../../lib/forms/validators";

export default class Juegos extends React.Component {
  updateForm;
  updateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formBusqueda: {
        juego: {
          value: undefined,
          errors: undefined,
          validate: required()
        }
      }
    };

    this.updateForm = updateForm.bind(this);
    this.validateField = validateField.bind(this);
    this.validateForm = validateForm.bind(this);
    this.populateErrors = populateErrors.bind(this);
    this.formBusquedaSubmit = this.formBusquedaSubmit.bind(this);
  }

  columnsConfig = [
    {
      Header: "Defensivo",
      accessor: "defensivo"
    },
    {
      Header: "Ofensivo",
      accessor: "ofensivo"
    },
    {
      Header: "Disclousure",
      accessor: "disclousure"
    },
    {
      Header: "Equipo",
      accessor: "id_team"
    }
  ];

  formBusquedaSubmit() {
    if (this.validateForm("formBusqueda")) {
      this.props
        .makeRequest(
          {
            method: "get",
            url: "/puntuacion-juego/1"
          },
          true,
          false
        )
        .then(response => {
          this.setState({ data: response.data.puntajes });
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }

  options = [
    { id: 1, nombre: "Un juego" },
    { id: 2, nombre: "Otro juego" },
    { id: 3, nombre: "El tercer juego" },
    { id: 4, nombre: "EL juego" }
  ];

  render() {
    return (
      <DefaultCard>
        <Row>
          <Col xs="4">
            <Select
              label={"Juego"}
              options={this.options}
              valueAccessor={"id"}
              labelAccessor={"nombre"}
              onChange={this.updateForm("formBusqueda", "juego")}
              onBlur={this.validateField("formBusqueda", "juego")}
              errors={this.state.formBusqueda.juego.errors}
              value={this.state.formBusqueda.juego.value}
            />
          </Col>
          <Col xs={{ size: 2, offset: 6 }}>
            <Button
              block
              color="success"
              className="btn-square btn-sm"
              onClick={this.formBusquedaSubmit}
            >
              Buscar
            </Button>
          </Col>
        </Row>
        <Table data={this.state.data} columns={this.columnsConfig} />
      </DefaultCard>
    );
  }
}
