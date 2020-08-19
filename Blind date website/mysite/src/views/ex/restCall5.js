import React from "react";
import { Container } from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

class RestCall5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  callApi = () => {
    console.log("5555");
    console.log(this.props);

    let url1 = "http://localhost:7777/testQuery5?name=" + this.props.name;
    let url2 = "http://localhost:7777/studentsubject";
    let url3 = "http://localhost:7777/testQuery1";
    fetch(url1)
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
    console.log(results);

    const columns = [
      {
        dataField: "id",
        text: "학번",
      },
      {
        dataField: "name",
        text: "이름",
      },
      {
        dataField: "department",
        text: "학과",
      },
      {
        dataField: "grade",
        text: "학년",
      },
    ];

    return (
      <>
        <BootstrapTable
          keyField="id"
          data={results}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
        />
      </>
    );
  }
}

export default RestCall5;
