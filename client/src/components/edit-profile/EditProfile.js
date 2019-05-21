import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextBox from '../common/TextBox';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      warnings: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.warnings) {
      this.setState({ warnings: nextProps.warnings });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { warnings, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profilio URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={warnings.twitter}
          />

          <InputGroup
            placeholder="Facebook puslapio URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={warnings.facebook}
          />

          <InputGroup
            placeholder="Linkedin profilio URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={warnings.linkedin}
          />

          <InputGroup
            placeholder="YouTube kanalo URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={warnings.youtube}
          />

          <InputGroup
            placeholder="Instagram puslapio URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={warnings.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: 'Pasirink norimą sritį', value: 0 },
      { label: 'Programuotojas', value: 'Programuotojas' },
      { label: 'Grafikos dizaineris', value: 'Grafikos dizaineris' },
      { label: 'WEB programuotojas', value: 'WEB programuotojas' },
      { label: 'Front-end programuotojas', value: 'Front-end programuotojas' },
      { label: 'Back-end programuotojas', value: 'Back-end programuotojas' },
      { label: 'SEO/SEO', value: 'SEO/SEO' },
      { label: 'CMS administratorius', value: 'CMS administratorius' },
      { label: 'Testuotojas', value: 'Testuotojas' },
      { label: 'Kita', value: 'Kita' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Atgal</Link>
              <h1 className="display-4 text-center">Redaguoti profilį</h1>
              <small className="d-block pb-3"></small>
              <form onSubmit={this.onSubmit}>
                <TextBox
                  placeholder="Profilio vardas(privalomas)"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={warnings.handle}
                  info="Trumpai apie save"
                />
                <SelectListGroup
                  placeholder="Sritis"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={warnings.status}
                  info="Kur nori būti savo karjeroje(privaloma)"
                />
                
                <TextBox
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={warnings.website}
                  info="CV puslapis"
                />
                
                <TextBox
                  placeholder="Vieta"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={warnings.location}
                  info="Vieta"
                />
                <TextBox
                  placeholder="Įgūdžiai(privaloma)"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={warnings.skills}
                  info="Atskirk savo įgūdžius per kablelį (pvz. Javscript,React..)"
                />
                <TextBox
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={warnings.githubusername}
                  info="Įtrauk savo projektus"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Pridėk socialinius tinklus
                  </button>
                  <span className="text-muted ">  Neprivaloma</span>
                </div>
                
                {socialInputs}
                
                <TextAreaFieldGroup
                  placeholder="Aprašymas"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={warnings.bio}
                  info="Papasakok apie save"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  warnings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  warnings: state.warnings
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
