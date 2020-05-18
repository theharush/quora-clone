import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            <nav className="menu">
                <Link to="/"><h1 class="inline brand">Quora</h1></Link>
                <Link to="/" class="inline">Home</Link>
                <Link to="/login" class="inline">login</Link>
                <Link to="/register" class="inline">register</Link>
                <input class="inline" type="text" value="Quora" />
                <input class="inline add-button" type="button" value="Add Question" />
            </nav>
        )
    }
}