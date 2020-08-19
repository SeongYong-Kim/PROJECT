import React from "react";
import { Container , Input, Button} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

class Refund extends React.Component {
    // constructor: 생성자만들기. class에서만 사용 가능
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      num: "",
      reason: "",
      price: "",
    //   results: []로 초기화 계속 해주기 안그러면 계속 덮어씌우는 형태가 돼서문제
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.getRefund = this.getRefund.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.getRefund();
}

  handleValueChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
}

  getRefund() {
    const data = {
        id: this.state.id,
        num: this.state.num,
        price : this.state.price,


    };

      const url = "http://localhost:7777/getrefund";
      const url2 = "http://localhost:7777/removeticket";
      fetch(url2, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })


      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert("정상적으로 환불 되었습니다.\n");
            window.location.href = "/mypage"
          } else {
            alert("입력 거부");
          }
        });
    
    }
// class의 function 은 callApi처럼 걍 저렇게 쓰면 됨. 막 def이런거 안써줘도 됨
// 구동할때 7777서버도 구동하고 있어야함. 켜놔야함. 
  callApi = () => {
    //   접근 by fetch.  call back
    fetch("http://localhost:7777/refundlist")
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
    const { results } = this.state;
    console.log(results);
// columns를 이용해 table을 좀 더 쉽게 만들건데, 여기서 미리 정의를 하는 것. 텍스트의 이름과 어떻게 표현할 것인가 등을 미리 설정. 
    const columns = [     // id sex name age interest height department cum_attention
        {
            dataField: "num",
            text: "티켓번호",
          },
          {
            dataField: "price",
            text: "가격",
          },
          {
            dataField: "time",
            text: "날짜",
          },
          {
            dataField: "place",
            text: "장소",
          },
          {
            dataField: "partner_id",
            text: "매칭파트너",
          },

    ];
    // 위의 dataField내용이 이해안되면, 찍히는 console log들을 봐라. 

    // 실제로 이테이블 만드는건 이거밖에 안된다.
    // key field가 뭐냐? (주키), 데이터는 어디 들어가있는지? column은 어떻게 이름이랑 데이터가 구조화되는지, 그리고 필터 두개
    return (
      <>
      <IndexNavbar />
      <div className="page-header clear-filter" filter-color="black">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require("assets/img/pink.jpg") + ")",
             }}
          ></div>
          <div className="content">                
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
          <Container>
                            <form onSubmit={this.handleFormSubmit}>
                                <h1>환불 티켓을 고르고 사유를 적어주세요.</h1>
                                환불 이용권 번호: {" "}
                                <Input
                                    type="text"
                                    name="num"
                                    value={this.state.num}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                환불 가격: {" "}
                                <Input
                                    type="text"
                                    name="price"
                                    value={this.state.price}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                환불 사유: {" "}
                                <Input
                                    type="text"
                                    name="reason"
                                    value={this.state.reason}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                <Button type="submit">환불하기</Button>
                                </form>
                            </Container>
        </div>
      </div>
    </>

    );
  }
}

export default Refund;
