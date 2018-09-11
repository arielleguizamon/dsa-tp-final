import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Table from "../../../components/STable";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

export default class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.habilitarEquipo = this.habilitarEquipo.bind(this);
  }

  columnsConfig = [
    {
      Header: "Nombre",
      accessor: "nombre"
    },
    {
      Header: "Organización",
      accessor: "organizacion"
    },
    {
      Header: "Capitán",
      accessor: "capitan.nombre"
    },
    {
      Header: "IP",
      accessor: "ip"
    },
    {
      Header: "Acciones",
      Cell: x => {
        return (
          <div>
            {!x.original.aprobado &&
              this.props.user.administrador && (
                <Button
                  color="success"
                  onClick={this.habilitarEquipo(x.original._id)}
                >
                  Habilitar
                </Button>
              )}
          </div>
        );
      }
    }
  ];

  componentDidMount() {
    this.fetchData();
  }

  habilitarEquipo(id) {
    return () => {
      this.props
        .makeRequest(
          {
            method: "PUT",
            url: "/equipo/" + id + "/habilitar",
            headers: {
              Authorization: "JWT " + this.props.user.token
            }
          },
          true,
          true
        )
        .then(() => {
          this.fetchData();
        });
    };
  }

  fetchData() {
    this.props
      .makeRequest(
        { method: "get", url: "/teams", params: { populate: "capitan" } },
        true,
        false
      )
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  render() {
    const user = this.props.user;
    return (
      <DefaultCard>
        {!user.equipo &&
          !user.administrador && (
            <NavLink to={"/equipos/crear"}>
              <Button>Registrar Equipo</Button>
            </NavLink>
          )}
        {!user.equipo &&
          !user.administrador && (
            <NavLink to={"/equipos/unirse"}>
              <Button>Unirse a Equipo</Button>
            </NavLink>
          )}

        <Table data={this.state.data} columns={this.columnsConfig} />
      </DefaultCard>
    );
  }
}
