import React, { Component } from "react";
import axios from "axios";

export default class Landing extends Component {
    render() {
        const name = (this.props.user) ? this.props.user.name : "undefined";
        return (
            <div>
                <h1>Landing</h1>
                <p>Hello {name} </p>
            </div>
        )
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/questions")
            .then(res => console.log(res))
    }
} 