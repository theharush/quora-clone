import React, { Component } from "react";
import axios from "axios";

export default class TagFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [{ tag: 'General' }],
            SelectedFilterTag: this.props.SelectedFilterTag
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8000/api/getFilterTags").then(req => {
            if (req.data) {
                this.setState({ tags: [{ tag: "All" }, ...req.data] })
            }
        })
    }
    render() {
        let tags = this.state.tags.map(tag => {
            const className = this.props.SelectedFilterTag === tag.tag ? "activeTagFilter" : "";
            return (
                <li key={tag.tag} >
                    <button
                        onClick={this.props.updateFilterTag}
                        name={tag.tag}
                        className={className}
                    >
                        {tag.tag}
                    </button>
                </li>)
        })

        return (
            <ul>
                {tags}
            </ul>
        )
    }
}