import React, { Component } from "react";
import axios from "axios";
import history from "../../history";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "theharush",
      password: "asd123",
      errMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("/api/login", user).then(res => {
      if (res.data.user) {
        this.props.updateUser(res.data.user);
        history.push("/");
      } else {
        console.log(res.data.errMsg);
        this.setState({ errMsg: res.data.errMsg });
      }
    });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>{this.state.errMsg.message}</h5>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
