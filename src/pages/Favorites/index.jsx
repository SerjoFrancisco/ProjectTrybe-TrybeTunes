import React, { Component } from 'react';
import Header from '../../components/Header';
import MusicCard from '../MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.updateFavorites = this.updateFavorites.bind(this);
    this.childRef = React.createRef(MusicCard);
    this.state = {
      favorites: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, isLoading: false });
  }

  async updateFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { favorites, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section>
          { isLoading ? (<Loading />)
            : (favorites?.map((music) => (
              <MusicCard
                ref={ this.childRef }
                key={ music.trackId }
                { ...music }
              />
            )))}
        </section>
      </div>
    );
  }
}
