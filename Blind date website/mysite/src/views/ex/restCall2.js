import React from "react";

class RestCall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      id: "",
      name: "",
      department: "",
      grade: 0,
    };
  }

  callApi = () => {
    fetch("http://localhost:7777/studentsearch")
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => 
        this.setState({
          results: data.results,
          id: data.results[0][Object.keys(data.results[0])[0]],
          name: data.results[0][Object.keys(data.results[0])[1]],
          department: data.results[0][Object.keys(data.results[0])[2]],
          grade: data.results[0][Object.keys(data.results[0])[3]],
        })
      );
  };

  componentDidMount() {
    this.callApi();
  }

  render() {
    const { results } = this.state;
    console.log("start render");
    console.log(results);
    console.log(this.state.id);
    console.log(this.state.name);
    console.log(this.state.department);
    console.log(this.state.grade);

    const id = this.state.id;
    const name = this.state.name;
    const department = this.state.department;
    const grade = this.state.grade;

    const gradeLevel = (grade) => {
      if (grade > 10) {
        return "A";
      } else {
        return "B";
      }
    };

    return (
      <>
        <div>
          <ul>
            {results.map((data, key) => {
              return (
                <div key={key}>
                  {"학번은" +
                    data.id +
                    "이고 이름은" +
                    data.name +
                    "입니다. 학과는" +
                    data.department +
                    "이고 성적은" +
                    data.grade +
                    "입니다"}
                </div>
              );
            })}
          </ul>
        </div>
      </>

      // <> 변수기 때문에 값 변경 가능 
      //   <div>{id}</div>
      //   <br />
      //   <div>{name}</div>
      //   <br />
      //   <div>{department}</div>
      //   <br />
      //   <div>{grade}</div>
      //   <br />
      //   <div>{gradeLevel(grade)}</div>
      // </>
    );
  }
}

export default RestCall;
