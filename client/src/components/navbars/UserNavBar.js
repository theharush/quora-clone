import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default class UserNavBar extends Component {
    constructor(props) {
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        if (this.props.user) {
            axios.get("/api/logout").then(
                () => {
                    this.props.logoutUser({});
                }
            )
        }
    }

    render() {
        return (
            <nav className="menu">
                <Link to="/"><h1 className="inline brand">Quora</h1></Link>
                <Link to="/" className="inline">Explore</Link>
                <Link to="/newQuestion" className="inline">Ask</Link>
                <div to="/login" className="inline">Hello, {this.props.user.name}</div>
                <button className="inline" onClick={this.logoutUser}> logout</button>
            </nav>
        );

    }
}