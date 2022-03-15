import React, { Component } from 'react';
import Header from '../../components/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../AlbumList';

export default class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      search: '',
      isButtonDisabled: true,
      albuns: [],
      artist: '',
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
    this.setState({ artist: search, search: '', albuns });
  }

  render() {
    const { isButtonDisabled, albuns, search, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </section>
        { !albuns.length ? (<p>Nenhum álbum foi encontrado</p>) : (
          <section>
            <h3>{`Resultado de álbuns de: ${artist}`}</h3>
            <div>
              {albuns?.map((album) => (
                <AlbumList
                  key={ album.collectionId }
                  { ...album }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
