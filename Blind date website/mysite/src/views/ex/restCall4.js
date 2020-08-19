import React from "react";
import { Container } from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

class RestCall4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      name: "",
    };
  }

  callApi = () => {
    console.log(this.props.depart);
    fetch("http://localhost:7777/studentsubject")
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) =>
        this.setState({
          results: data.results,
        })
      );
  };

  componentDidMount() {
    this.callApi();
  }

  render() {
    const { results } = this.state;

    const columns = [
      {
        dataField: "id",
        text: "과목번호",
      },
      {
        dataField: "subject_name",
        text: "과목",
      },
      {
        dataField: "credits",
        text: "학점",
      },
    ];

    return (
      <>
        <BootstrapTable
          keyField="id"
          data={results}
          columns={columns}
          filter={filterFactory()}
          // pagination={paginationFactory()}
        />
      </>
    );
  }
}

export default RestCall4;
