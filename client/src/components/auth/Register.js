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

        axios
            .post("http://localhost:8000/register", user)
            .then(res => {
                console.log(res);
                if (res.data.username) {
                    console.log(res.data);
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
        return (
            <form onSubmit={this.handleSubmit}>
                <h5>{this.state.errMsg}</h5>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={this.state.question}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={this.state.question}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={this.state.question}
                        onChange={this.handleInputChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
