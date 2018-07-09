import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {
    if(!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }

    console.log(post)
    return(
      <div>
        <Link to="/">Home</Link>
        <h3>{post.title}</h3>
        <img src={post.content} alt="Media not displayed"/>
        <h5>Description: {post.categories}</h5>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps,{ fetchPost })(PostsShow);
