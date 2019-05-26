import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { connect } from 'react-redux';

import { getProfiles } from '../../actions/profileActions';


class PostFeed extends Component {

  componentDidMount() {
    this.props.getProfiles();
  }

  
  render() {
    const { posts, profile } = this.props;
    const { profiles } = profile;
    const usersHandle = {};

    if(profiles) {
    profiles.forEach(p => {
      usersHandle[p.user._id] = p.handle;
    })
    }

    return posts.map(post => <PostItem key={post._id} post={post} handle={usersHandle} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, { getProfiles })(PostFeed);
