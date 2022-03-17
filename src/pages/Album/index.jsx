import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.getAlbum = this.getAlbum.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.state = {
      collectionId: '',
      musics: [],
      artist: '',
      album: '',
      favorites: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    this.setState({ collectionId: id }, () => this.getAlbum());
  }

  async getAlbum() {
    const { collectionId } = this.state;
    const musics = await getMusics(collectionId);
    this.setState({ musics,
      artist: musics[0].artistName,
      album: musics[0].collectionName });
  }

  async updateFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { artist, album, musics, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artist}</h2>
        <h3 data-testid="album-name">{album}</h3>
        <section>
          {musics?.map((music, i) => (
            i === 0 ? (
              <p key="ignore1">Musicas</p>
            ) : (
              <MusicCard
                key={ music.trackId }
                { ...music }
                updateFavorites={ this.updateFavorites }
                favorites={ favorites }
              />
            )))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  collectionId: PropTypes.string,
}.isRequired;
