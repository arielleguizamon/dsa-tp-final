import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Table from "../../../components/STable";

export default class Levantados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  columnsConfig = [
    {
      Header: "Nombre",
      accessor: "nombre_team"
    },
    {
      Header: "ID Team",
      accessor: "id_team"
    },
    {
      Header: "IP",
      accessor: "vm"
    },
    {
      Header: "Usuario",
      accessor: "id_usuario"
    }
  ];

  serviciosColumnsConfig = [
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
    this.fetchData();
  }

  fetchData() {
    this.props
      .makeRequest(
        {
          method: "get",
          url: "/servicios-levantados"
        },
        true,
        false
      )
      .then(response => {
        console.log(response.data.equipos);
        this.setState({ data: response.data.equipos });
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  renderServicios = row => {
    return (
      <Table
        data={row.original.servicios}
        columns={this.serviciosColumnsConfig}
        showPagination={false}
        defaultPageSize={0}
      />
    );
  };

  render() {
    return (
      <DefaultCard>
        <Table
          data={this.state.data}
          columns={this.columnsConfig}
          SubComponent={this.renderServicios}
        />
      </DefaultCard>
    );
  }
}
