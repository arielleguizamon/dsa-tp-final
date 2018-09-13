import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Table from "../../../components/STable";

export default class Juegos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
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

  render() {
    const user = this.props.user;
    return (
      <DefaultCard>
        <Table data={this.state.data} columns={this.columnsConfig} />
      </DefaultCard>
    );
  }
}
