import React, { Component } from "react";
import axios from "axios";
import history from '../history';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:8000/login', user)
            .then(res => {
                this.props.updateUser(res.data);
                history.push("/");
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
        )
    }
}