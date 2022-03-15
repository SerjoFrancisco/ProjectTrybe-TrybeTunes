import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../pages/Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    this.setState({ user: userName.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <section>

            <div data-testid="header-component">
              Header
              <h3 data-testid="header-user-name">{ user }</h3>
            </div>
            <nav>
              <Link to="/search" data-testid="link-to-search">
                <button type="button">
                  Search
                </button>
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <button type="button">
                  Favorites
                </button>

              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <button type="button">
                  Profile
                </button>

              </Link>
            </nav>
          </section>
        )}
      </section>
    );
  }
}
