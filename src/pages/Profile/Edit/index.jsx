import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import Loading from '../../Loading';
import { getUser, updateUser } from '../../../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validadeForm = this.validadeForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isLoading: true,
      isButtonDisabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ name: user.name,
      isLoading: false,
      email: user.email,
      image: user.image,
      description: user.description });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validadeForm());
  }

  async handleClick() {
    const { history } = this.props;
    const { name, email, description, image } = this.state;
    const user = { name, email, image, description };
    this.setState({ isLoading: true });
    await updateUser(user);
    history.push('/profile');
  }

  validadeForm() {
    const { name, email, description, image } = this.state;
    const form = [name, email, description, image];
    const regEx = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const validadeEmail = regEx.test(email);
    if (form.every((atributte) => atributte !== '') && validadeEmail) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const { isLoading, name, email, image, description, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? (<Loading />)
          : (
            <div>
              <h2>Editar perfil</h2>
              <form action="">
                <label htmlFor="name">
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    id="name"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="edit-input-email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">
                  <input
                    type="text"
                    data-testid="edit-input-description"
                    id="description"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="image">
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    id="image"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                  />

                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  disabled={ isButtonDisabled }
                >
                  Salvar

                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
