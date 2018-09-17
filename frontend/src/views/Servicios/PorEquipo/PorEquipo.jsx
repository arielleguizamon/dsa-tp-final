import React from "react";
import DefaultCard from "../../../components/DefaultCard";
import Table from "../../../components/STable";

export default class PorEquipo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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
        this.setState({ data: response.data.servicios });
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
