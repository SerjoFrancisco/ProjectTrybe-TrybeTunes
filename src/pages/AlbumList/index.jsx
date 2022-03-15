import React, { Component } from 'react';
import propTypes from 'prop-types';
import Loading from '../Loading';

export default class AlbumList extends Component {
  render() {
    const { collectionName, collectionId, artistName, artworkUrl100 } = this.props;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div data-testid={ `link-to-album-${collectionId}` }>
            <h3>{collectionName}</h3>
            <img src={ artworkUrl100 } alt="" />
            <p>{artistName}</p>
          </div>)}
      </div>
    );
  }
}

AlbumList.propTypes = {
  collectionName: propTypes.string,
  collectionId: propTypes.string,
  artistName: propTypes.string,
  artworkUrl100: propTypes.string,
}.isRequired;
