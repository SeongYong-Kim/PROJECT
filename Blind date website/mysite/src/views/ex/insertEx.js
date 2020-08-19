import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

class InsertPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      department: "",
      grade: "",
      exampleRadios: "",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleValueChange = this.handleValueChange.bind(this);

    this.addStudent = this.addStudent.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.addStudent();
  }

  handleValueChange(e) {
    let nextState = {};

    nextState[e.target.name] = e.target.value;

    this.setState(nextState);
  }

  setRadiobtn(e) {
    console.log(e.target.value);
  }

  addStudent() {
    const url = "http://localhost:7777/studentadd";
    const data = {
      id: this.state.id,
      name: this.state.name,
      department: this.state.department,
      grade: this.state.grade,
      exampleRadios: this.state.exampleRadios,
    };

    console.log(data);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result.name);
        if (data) {
          alert("정상적으로 입력 되었습니다.\n" + data.result.name);
          window.location.href = "/restcall2?name=" + data.result.name;
        } else {
          alert("입력 거부");
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>학생 추가</h1>
        아이디:{" "}
        <input
          type="text"
          name="id"
          value={this.state.id}
          onChange={this.handleValueChange}
        />
        <br />
        이름:{" "}
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleValueChange}
        />
        <br />
        학과:{" "}
        <input
          type="text"
          name="department"
          value={this.state.department}
          onChange={this.handleValueChange}
        />
        <br />
        성적:{" "}
        <input
          type="text"
          name="grade"
          value={this.state.grade}
          onChange={this.handleValueChange}
        />
        <br />
        <p className="category">Radios</p>
        <div onChange={this.handleValueChange}>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option1"
                id="exampleRadios1"
                name="exampleRadios"
                type="radio"
              ></Input>
              <span className="form-check-sign"></span>
              Radio is off
            </Label>
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultChecked
                defaultValue="option2"
                id="exampleRadios1"
                name="exampleRadios"
                type="radio"
              ></Input>
              <span className="form-check-sign"></span>
              Radio is on
            </Label>
          </FormGroup>
        </div>
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default InsertPage;
