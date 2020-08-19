import React from "react";

import { Button, Input, Container} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
// id sex name age interest height departmen cum)_attention
class InsertPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            sex: "",
            name: "",
            age: "",
            interest: "",
            height: "",
            department: "",
            cum_attention: "0",
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.addSolo = this.addSolo.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addSolo();
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addSolo() {
        const url = "http://localhost:7777/soloadd";
        const data = {
            id: this.state.id,
            sex: this.state.sex,
            name: this.state.name,
            age: this.state.age,
            interest: this.state.interest,
            height: this.state.height,
            department: this.state.department,
            cum_attention: this.state.cum_attention,
        };

        // fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
            // .then((res) => res.text())
            // .then((response) => console.log("Success:", response))
            // .catch((error)) => console.error("Error:", error);
    // }

        // fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //     if (data) {
        //         alert("정상적으로 입력 되었습니다.\n")
        //         window.location.href = "/allcall"
        //     } else {
        //         alert("입력 거부");
        //     }
        //     });

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
                alert("정상적으로 입력 되었습니다.\n");
                window.location.href = "/allcall"
              } else {
                alert("입력 거부");
              }
            });
    }

    render() {
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
                        <Container>
                            <form onSubmit={this.handleFormSubmit}>
                                <h1>Join us!</h1>
                                아이디: {" "}
                                <Input
                                    type="text"
                                    name="id"
                                    value={this.state.id}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                성별: {" "}
                                <Input
                                    type="text"
                                    name="sex"
                                    value={this.state.sex}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                이름:{" "}
                                <Input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                나이: {" "}
                                <Input
                                    type="text"
                                    name="age"
                                    value={this.state.age}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                취미: {" "}
                                <Input
                                    type="text"
                                    name="interest"
                                    value={this.state.interest}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                키: {" "}
                                <Input
                                    type="text"
                                    name="height"
                                    value={this.state.height}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                학과: {" "}
                                <Input
                                    type = "text"
                                    name= "department"
                                    value = {this.state.department}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                <br />
                                <Button type="submit">추가하기</Button>
                                </form>
                            </Container>
                    </div>
                </div>
            </>
        ); 
    }
}

export default InsertPage;
// id sex name age interest height departmen cum)_attention