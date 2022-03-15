import React, { Component } from 'react';
import Header from '../../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // search: '',
      isButtonDisabled: true,
    };
  }

  handleChange({ target }) {
    const minLength = 2;
    console.log(target.value.length);
    if (target.value.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    // this.setState({ search: target.value });
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </section>
      </div>
    );
  }
}
