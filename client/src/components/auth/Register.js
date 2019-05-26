import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextBox from '../common/TextBox';

const USER_TYPE_STUDENT = 'STUDENT';
const USER_TYPE_EMPLOYER= 'EMPLOYER';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      //initial state
      userType: USER_TYPE_STUDENT,
      name: '',
      email: '',
      password: '',
      password2: '',
      warnings: {}
    };

    this.onUserTypeChange = this.onUserTypeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.warnings) {
      this.setState({ warnings: nextProps.warnings });
    }
  }

  onUserTypeChange(userType) {
    this.setState({
      userType
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { userType } = this.state;

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userType
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { warnings } = this.state;

    return (
      <div className="register">
        <div className="reg-container container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registracija</h1>
              <p className="lead text-center">
                Susikurkite Stud<span style={{ color: "white" }}>IT</span> profilį
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="choose-container btn-group btn-group-toggle" data-toggle="buttons">
                  <label  onClick={()=> { this.onUserTypeChange(USER_TYPE_STUDENT) }} name="student" className="choose-item btn btn-secondary active">
                    <input value type="radio" name="options" id="option1" autocomplete="off" checked /> Studentas
                </label>
                  <label onClick={()=> { this.onUserTypeChange(USER_TYPE_EMPLOYER) }} className="choose-item btn btn-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off" /> Darbdavys
                </label>
                </div>
                <TextBox
                  placeholder="Vardas"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={warnings.name}
                />
                <TextBox
                  placeholder="EL. paštas"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={warnings.email}
                />
                <TextBox
                  placeholder="Slaptažodis"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={warnings.password}
                />
                <TextBox
                  placeholder="Pakartotinis slaptažodis"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={warnings.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  warnings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  warnings: state.warnings
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
