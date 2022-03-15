import React, { Component } from 'react';
import Header from '../../components/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading';
import AlbumList from '../AlbumList';

export default class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      search: '',
      isButtonDisabled: true,
      isLoading: false,
      albuns: [],
    };
  }

  handleChange({ target }) {
    const minLength = 2;
    if (target.value.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({ search: target.value });
  }

  async handleClick() {
    const { search } = this.state;
    const albuns = await searchAlbumsAPI(search);
    this.setState({ albuns });
  }

  render() {
    const { isButtonDisabled, albuns } = this.state;
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
        { albuns?.map((album) => (
          <AlbumList
            key={ album.collectionId }
            { ...albuns }
          />))}
      </div>
    );
  }
}
