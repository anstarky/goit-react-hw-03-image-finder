import React, { Component } from 'react';

import styles from './SearchForm.module.css';

class SearchForm extends Component {
    state = { query: '' };

    handleChange = e => {
        this.setState({
            query: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
        return (
            <form
                className={styles.search__form}
                onSubmit={this.handleSubmit}
            >
                <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    autoComplete="off"
                    placeholder="Search images..."
                />
            </ form>
        );
    }
}


export default SearchForm;
