import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        if (this.props.user.name) {
            return (
                <nav className="menu">
                    <Link to="/"><h1 className="inline brand">Quora</h1></Link>
                    <Link to="/" className="inline">Home</Link>
                    <Link to="/addQuestion" className="inline">Add Question</Link>
                    <div to="/login" className="inline">Hello, {this.props.user.name}</div>
                    <button className="inline"> logout</button>
                </nav>
            );
        } else {
            return (
                <nav className="menu">
                    <Link to="/"><h1 className="inline brand">Quora</h1></Link>
                    <Link to="/" className="inline">Home</Link>
                    <Link to="/login" className="inline">login</Link>
                    <Link to="/register" className="inline">register</Link>
                    <input className="inline add-button" type="button" value="Add Question" />
                </nav>
            )
        }
    }
}