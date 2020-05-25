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
        axios.get("/api/getFilterTags").then(req => {
            if (req.data) {
                this.setState({ tags: [{ tag: "All" }, ...req.data] })
            }
        })
    }
    render() {
        let tags = this.state.tags.map(tag => {
            const className = this.props.SelectedFilterTag === tag.tag ? "active-tag-filter" : "";

            return (
                <li key={tag.tag} >
                    <button
                        onClick={this.props.updateFilterTag}
                        name={tag.tag}
                        className={`btn btn-filter-tag btn-block ${className}`}
                    >
                        {tag.tag}
                    </button>
                </li>)
        })

        return (
            <ul className="tag-filter">
                {tags}
            </ul>
        )
    }
}