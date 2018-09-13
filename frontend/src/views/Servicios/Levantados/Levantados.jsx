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
    this.fetchData();
  }

  fetchData() {
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
        console.log(response.data);
        //this.setState({ data: response.data.puntajes });
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
