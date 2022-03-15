import React, { Component } from 'react';
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
          <div data-testid="header-component">
            Header
            <h3 data-testid="header-user-name">{ user }</h3>
          </div>)}
      </section>
    );
  }
}
