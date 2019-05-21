import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  return (
    <div className="profile-link-buttons btn-group mb-4" role="group">
      <Link to="/edit-profile" className="profile-link-buttons  btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Redaguoti profilį
      </Link>
      <Link to="/add-experience" className="profile-link-buttons  btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Pridėti patirtį
      </Link>
      <Link to="/add-education" className="profile-link-buttons btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Pridėti veiklas
      </Link>
    </div>
  );
};

export default ProfileCard;
