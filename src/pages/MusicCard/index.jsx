import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.manageFavorites = this.manageFavorites.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
    this.state = {
      isFavorite: false,
      isLoading: true,
      favorites: [],
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, isLoading: false }, () => this.checkFavorites());
  }

  checkFavorites() {
    const { favorites } = this.state;
    const { trackId } = this.props;
    if (favorites.find(({ trackId: id }) => id === trackId)) {
      this.setState({ isFavorite: true });
    }
  }

  async manageFavorites({ target }) {
    const { updateFavorites } = this.props;
    if (target.checked) {
      this.setState({ isLoading: true });
      await addSong(this.props);
      this.setState({ isFavorite: true, isLoading: false });
    } else {
      this.setState({ isLoading: true });
      await removeSong(this.props);
      this.setState({ isFavorite: false, isLoading: false });
    }
    updateFavorites();
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite" id={ trackId }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.manageFavorites }
            checked={ isFavorite }
          />

        </label>
        { isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.string,

}.isRequired;
