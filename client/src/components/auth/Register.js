import React, { Component } from "react";
import axios from "axios";
import history from "../../history";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      errMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    };

    axios.post("/api/register", user).then(res => {
      console.log(res);
      if (res.data.username) {
        this.props.updateUser(res.data);
        history.push("/");
      } else if (res.data.message) {
        this.setState({ errMsg: res.data.message });
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
    let errMsg = null;
    if (this.state.errMsg)
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errMsg}
        </div>
      )

    return (
      <div className="flex-container">
        <div className="card form-card">
          <form onSubmit={this.handleSubmit} className="card-body">
            {errMsg}
            <div className="form-group">
              <label for="username"> Username:</label>
              <input
                className="form-control"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="name"> name:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="password">Password:</label>
              <input
                className="form-control"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    );
  }
}
