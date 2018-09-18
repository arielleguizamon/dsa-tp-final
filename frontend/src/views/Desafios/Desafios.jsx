import React from "react";
import DefaultCard from "../../components/DefaultCard";
import Table from "../../components/STable";

export default class Desafios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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
    this.fetchData();
  }

  fetchData() {
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
        console.log(response.data.desafios);
        this.setState({ data: response.data.desafios });
      })
      .catch(errors => {
        console.log(errors);
      });
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
        <Table
          data={this.state.data}
          columns={this.columnsConfig}
          SubComponent={this.renderHints}
        />
      </DefaultCard>
    );
  }
}
