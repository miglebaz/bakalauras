import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      warnings: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.warnings) {
      this.setState({ warnings: newProps.warnings });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-header-container post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Įdėti skelbimą</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="skelbimo tekstas"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  warnings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  warnings: state.warnings
});

export default connect(mapStateToProps, { addPost })(PostForm);
