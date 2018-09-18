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

export default class PorEquipo extends React.Component {
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
      Header: "Nombre",
      accessor: "nombre"
    },
    {
      Header: "Puerto",
      accessor: "puerto"
    },
    {
      Header: "Estado",
      accessor: "estado"
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
            url: "/servicios-levantados/1"
          },
          true,
          false
        )
        .then(response => {
          this.setState({ data: response.data.servicios });
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }

  render() {
    return (
      <DefaultCard>
        <Row>
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
