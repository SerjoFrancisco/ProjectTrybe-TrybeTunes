import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      user: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  handleChange({ target }) {
    const minLength = 3;
    console.log(target.value.length);
    if (target.value.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({ user: target.value });
  }

  async handleClick() {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    history.push('/search');
  }

  render() {
    const { isButtonDisabled, isLoading } = this.state;
    return (
      <section>
        { isLoading ? <Loading />
          : <div data-testid="page-login">
            <label htmlFor="login-form">
              <input
                type="text"
                data-testid="login-name-input"
                id="login-form"
                name="name"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
              type="button"
            >
              Entrar
            </button>
          </div>}
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
