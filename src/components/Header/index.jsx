import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaStar, FaSearch } from 'react-icons/fa';
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
          <section className="header">

            <div data-testid="header-component">
              <h3 data-testid="header-user-name">{ user }</h3>
            </div>
            <Link to="/search">
              <h1 className="title">YouTunes</h1>
            </Link>
            <nav>
              <Link to="/search" data-testid="link-to-search">
                <FaSearch className="icon" />

              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <FaStar className="icon" />

              </Link>
              <Link to="/profile" data-testid="link-to-profile">

                <FaUser className="icon" />

              </Link>
            </nav>
          </section>
        )}
      </section>
    );
  }
}
