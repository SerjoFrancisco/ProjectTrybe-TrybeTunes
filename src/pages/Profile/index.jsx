import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? (<Loading />)
          : (
            <div>
              <h3>{user.name}</h3>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <p>{user.email}</p>
              <p>{user.description}</p>
            </div>

          )}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
