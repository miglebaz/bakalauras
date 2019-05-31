import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile, getCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }


  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { userType } = user;
    const { profile } = this.props.profile;

    const authenticateNavBarLinks = (
      <ul className="navbar-nav ml-auto">
        <div className="dropdown">
          <button className="nav-button btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <li className="nav-item">
              Profilio nustatymai {' '}
              <img
                className="rounded-circle nav-icon"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
        
              />{' '}
            </li>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            { userType === 'STUDENT' && <Link className="dropdown-item" to="/dashboard">Koreguoti profilį</Link>}
            { profile && userType === 'STUDENT' && <Link className="dropdown-item" to={`/profile/${profile.handle}`}>Peržiūrėti profilį</Link>}
            <a className="dropdown-item" onClick={this.onLogoutClick.bind(this)} href="#">Atsijungti</a>
          </div>
        </div>
      </ul>
    );

    const notRegisterUserLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Prisiregistruoti
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Prisijungti
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">
          StudIT
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/feed">
                Skelbimai
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Profiliai
                </Link>
            </li>
          </ul>
          {isAuthenticated ? authenticateNavBarLinks : notRegisterUserLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, getCurrentProfile, clearCurrentProfile })(
  Navbar
);


