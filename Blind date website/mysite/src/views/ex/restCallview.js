import React from "react";
import { Container } from "reactstrap";
import queryString from "query-string";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

import RestCall5 from "views/examples/restCall5.js";
import RestCall4 from "views/examples/restCall4.js";

class RestCallview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(this.props.location.search),
    };
  }

  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header clear-filter" filter-color="blue">
            <Container>
              <RestCall5 name={this.state.query.name} />
              <RestCall4 depart={this.state.query.depart} />
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default RestCallview;
