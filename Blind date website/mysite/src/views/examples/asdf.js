import React from "react";
import { Container } from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

class Admin extends React.Component {
    // constructor: 생성자만들기. class에서만 사용 가능
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      results: [],
    //   results: []로 초기화 계속 해주기 안그러면 계속 덮어씌우는 형태가 돼서문제
    };
  }
// class의 function 은 callApi처럼 걍 저렇게 쓰면 됨. 막 def이런거 안써줘도 됨
// 구동할때 7777서버도 구동하고 있어야함. 켜놔야함. 
  callApi = () => {
    //   접근 by fetch.  call back
    fetch("http://localhost:7777/ratio")
    // callback된 데이터를 res로 받고, 받은 데이터를 json으로 바꿔준다. 
      .then((res) => res.json())
      // .then((data) => console.log(data))
    //   하나의 데이터로 형태로 받고, result로 넣을애들을 뽑아서 초기화시킨result에 넣어주겠다
      .then((data) =>
        this.setState({
          result: data.results,
        })
      );

    fetch("http://localhost:7777/refundedlist")
    // callback된 데이터를 res로 받고, 받은 데이터를 json으로 바꿔준다. 
    .then((res) => res.json())
    // .then((data) => console.log(data))
    //   하나의 데이터로 형태로 받고, result로 넣을애들을 뽑아서 초기화시킨result에 넣어주겠다
    .then((data) =>
        this.setState({
        results: data.results,
        })
    );
  };

//   componentDidMount(): 우리가 정의한 함수가 아님. react서버랑 약속되어진 함수. 
//   component가 특정한 페이지나 그런데 mount되는 순간에 실행되어야하는 함수들을 정리해놓은 것.
  componentDidMount() {
    this.callApi();
    // 이 component가 mount되면 callApi를 호출해라.
  }

//  console.log: 이 sate의 result라는 값이 있는데, 얠 갖고와서 일단 console(f11눌렀을때 뜨는 console)에 찍어서 잘 갖고 왔는지 확인
//  
    render() {
        const result = this.state.result;
        const {results} = this.state.results;

    return (
        <>
        <IndexNavbar />
        <div className="page-header clear-filter" filter-color="black">
            <div
              className="page-header-image"
              style={{
                backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
               }}
            ></div>
            <div className="content">           
            {result}
            <br />

            <Container>
            <div>
              <BootstrapTable
                keyField="id"
                data={results}
                columns={columns}
                // filter1. 필터가 가능한 형태로 만들어 주는 함수
                filter={filterFactory()}
                // filter2. 페이지 나눠주게 하는 거
                pagination={paginationFactory()}
                // 만약 저 앞에서 react-bootstrap-table을 설치하지 않았다면 여기서 엄청 고생했을거
                // 근데 우리가 데이터를 정형화시켜놓고 잘만 갖고 오고 체크를 하면, 이렇게 쉬워진다.
              />
            </div>
          </Container>

          </div>
        </div>
        
      </>
  
      );
  }
}

export default Admin;
