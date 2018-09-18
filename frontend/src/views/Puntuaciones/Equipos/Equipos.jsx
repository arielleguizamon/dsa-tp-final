import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Select from "../../../components/Select";
import Table from "../../../components/STable";
import { Row, Col, Button } from "reactstrap";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../../lib/forms/utils";
import { required } from "../../../lib/forms/validators";

export default class Equipos extends React.Component {
  updateForm;
  updateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      equipos: [],
      formBusqueda: {
        juego: {
          value: undefined,
          errors: undefined,
          validate: required()
        },
        equipo: {
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
      Header: "Usuario",
      accessor: "id_usuario"
    }
  ];

  componentDidMount() {
    this.fetchEquipos();
  }

  fetchEquipos() {
    this.props
      .makeRequest(
        {
          method: "get",
          url: "/teams"
        },
        true,
        false
      )
      .then(response => {
        this.setState({ equipos: response.data });
      });
  }

  formBusquedaSubmit() {
    if (this.validateForm("formBusqueda")) {
      this.props
        .makeRequest(
          {
            method: "get",
            url: "/puntuacion-equipo/1/1"
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
          <Col xs="4">
            <Select
              label={"Equipo"}
              options={this.state.equipos}
              valueAccessor={"_id"}
              labelAccessor={"nombre"}
              onChange={this.updateForm("formBusqueda", "equipo")}
              onBlur={this.validateField("formBusqueda", "equipo")}
              errors={this.state.formBusqueda.equipo.errors}
              value={this.state.formBusqueda.equipo.value}
            />
          </Col>
          <Col xs={{ size: 2, offset: 2 }}>
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
