import React, { Component } from "react";

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
}