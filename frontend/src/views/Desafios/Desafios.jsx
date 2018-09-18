import React from "react";
import DefaultCard from "../../components/DefaultCard";
import Select from "../../components/Select";
import Table from "../../components/STable";
import { Row, Col, Button } from "reactstrap";
import {
  updateForm,
  validateField,
  validateForm,
  populateErrors
} from "../../lib/forms/utils";
import { required } from "../../lib/forms/validators";

export default class Desafios extends React.Component {
  updateForm;
  updateField;
  validateForm;
  populateErrors;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      usuarios: [],
      formBusqueda: {
        usuario: {
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
      Header: "Id",
      accessor: "id_desafio"
    },
    {
      Header: "Título",
      accessor: "titulo"
    },
    {
      Header: "Descripción",
      accessor: "descripcion"
    },
    {
      Header: "Categoría",
      accessor: "categoria"
    },
    {
      Header: "Puntos",
      accessor: "puntos"
    },
    {
      Header: "Adjunto",
      Cell: x => <a href={"http://" + x.original.adjunto}>Link</a>
    }
  ];

  hintsColumnsConfig = [
    {
      Header: "Id",
      accessor: "id_hint"
    },
    {
      Header: "Disponible",
      Cell: x => (x.original.disponible == true ? "Si" : "No")
    },
    {
      Header: "Porcentaje",
      accessor: "porcentaje"
    }
  ];

  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.props
      .makeRequest(
        {
          method: "get",
          url: "/users"
        },
        true,
        false
      )
      .then(response => {
        this.setState({
          usuarios: response.data.filter(
            element => !element.administrador && element.habilitado
          )
        });
      });
  }

  formBusquedaSubmit() {
    if (this.validateForm("formBusqueda")) {
      this.props
        .makeRequest(
          {
            method: "get",
            url: "/desafios/1"
          },
          true,
          false
        )
        .then(response => {
          this.setState({ data: response.data.desafios });
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }

  renderHints = row => {
    const data = [];
    data.push(row.original.Hint1);
    data.push(row.original.Hint2);
    return (
      <Table
        data={data}
        columns={this.hintsColumnsConfig}
        showPagination={false}
        defaultPageSize={0}
      />
    );
  };

  render() {
    const user = this.props.user;
    return (
      <DefaultCard>
        <Row>
          <Col xs="4">
            <Select
              label={"Usuario"}
              options={this.state.usuarios}
              valueAccessor={"_id"}
              labelAccessor={"nombre"}
              onChange={this.updateForm("formBusqueda", "usuario")}
              onBlur={this.validateField("formBusqueda", "usuario")}
              errors={this.state.formBusqueda.usuario.errors}
              value={this.state.formBusqueda.usuario.value}
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
        <Table
          data={this.state.data}
          columns={this.columnsConfig}
          SubComponent={this.renderHints}
        />
      </DefaultCard>
    );
  }
}
