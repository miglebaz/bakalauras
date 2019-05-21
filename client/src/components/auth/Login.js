import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextBox from '../common/TextBox';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      warnings: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.warnings) {
      this.setState({ warnings: nextProps.warnings });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { warnings } = this.state;

    return (
      <div className="login">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Prisijungti</h1>
            <p className="lead text-center">
              Prisijunk prie savo profilio
              </p>
            <form onSubmit={this.onSubmit}>
              <TextBox
                placeholder="el. paštas"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={warnings.email}
              />

              <TextBox
                placeholder="slaptažodis"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={warnings.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  warnings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  warnings: state.warnings
});

export default connect(mapStateToProps, { loginUser })(Login);
