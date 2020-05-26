import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class GuestNavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">Quora</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link">login</Link>
                            <Link to="/register" className="nav-item nav-link">register</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}