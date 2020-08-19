import React from "react";

import { Button, Input, Container} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
// id sex name age interest height departmen cum)_attention
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sex: "x",
            age_gte: "x",
            age_lte: "x",
            interest: "x",
            height_gte: "x",
            height_lte: "x",
            department: "x",
            cum_attention_gte: "x",
            address: "x",
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.searchSolo = this.searchSolo.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.searchSolo();
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    searchSolo() {
        const url = "http://localhost:7777/solosearch";
        const data = {
            sex: this.state.sex,
            age_gte: this.state.age_gte,
            age_lte: this.state.age_lte,
            interest: this.state.interest,
            height_gte: this.state.height_gte,
            height_lte: this.state.height_lte,
            department: this.state.department,
            cum_attention_gte: this.state.cum_attention_gte,
            address: this.state.address,
        };



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
                window.location.href = "/match"
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
                                <h1>만나고싶은 상대를 검색하세요!</h1>
                                성별: {""}
                                <Input
                                    type="text"
                                    name="sex"
                                    value={this.state.sex}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                나이(이상): {""}
                                <Input
                                    type="text"
                                    name="age_gte"
                                    value={this.state.age_gte}
                                    onChange = {this.handleValueChange}
                                />
                                나이(이하): {""}
                                <Input
                                    type="text"
                                    name="age_lte"
                                    value={this.state.age_lte}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                취미: {""}
                                <Input
                                    type="text"
                                    name="interest"
                                    value={this.state.interest}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                키(이상): {""}
                                <Input
                                    type="text"
                                    name="height_gte"
                                    value={this.state.height_gte}
                                    onChange = {this.handleValueChange}
                                />
                                키(이하): {""}
                                <Input
                                    type = "text"
                                    name= "height_lte"
                                    value = {this.state.height_lte}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                학과: {""}
                                <Input
                                    type="text"
                                    name="department"
                                    value={this.state.department}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                누적관심도(이상): {""}
                                <Input
                                    type="text"
                                    name="cum_attention_gte"
                                    value={this.state.cum_attention_gte}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                주소: {""}
                                <Input
                                    type="text"
                                    name="address"
                                    value={this.state.address}
                                    onChange = {this.handleValueChange}
                                />
                                <br />
                                <br />
                                <Button type="submit">검색</Button>
                                </form>
                            </Container>
                    </div>
                </div>
            </>
        ); 
    }
}

export default Search;
// id sex name age interest height departmen cum)_attention