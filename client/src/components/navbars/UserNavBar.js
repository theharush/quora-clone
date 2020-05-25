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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Quora</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav mr-auto">
                        <Link to="/" className="nav-item nav-link">Explore</Link>
                        <Link to="/newQuestion" className="nav-item nav-link">Ask</Link>
                    </div>
                    <div className="navbar-nav">
                        <div className="navbar-text">Hello, {this.props.user.name}</div>
                        <div className="nav-item nav-link" onClick={this.logoutUser}> logout</div>
                    </div>
                </div>
            </nav>
        );
    }
}