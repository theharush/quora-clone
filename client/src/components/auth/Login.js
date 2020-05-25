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
    let errMsg = null;
    if (this.state.errMsg.message)
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errMsg.message}
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
