import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class GuestNavBar extends Component {
    render() {
        return (
            <nav className="menu">
                <Link to="/"><h1 className="inline brand">Quora</h1></Link>
                <Link to="/" className="inline">login</Link>
                <Link to="/register" className="inline">register</Link>
            </nav>
        )
    }
}