import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex  extends Component {

componentDidMount() {
  this.props.fetchPosts();
}

renderPosts() {
  return _.map(this.props.posts, post => {
    return (
      <li className="list-group-item main-post-list" key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  })
}

  render() {
    return (
      <div>
        <h1 className="main-title">Meme Definer</h1>
        <div className="main-button-sub-head">
        <h3 className="sub-title">Posts</h3>
        <Link className="btn btn-primary add-post-button" to="/posts/new">Add A Post!</Link>
      </div>
        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
