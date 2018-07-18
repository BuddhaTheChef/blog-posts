import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {
    if(!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
    window.scrollTo(0, 0)
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }

    console.log(post)
    return(
      <div className="post-show-main">

        <h3 className="post-title">{post.title}</h3>

        <div className="post-contents">
        <div className="post-div-media">
          <img className="post-media" src={post.content} alt="Media not displayed" />
        </div>

        <div className="post-right-div">
          <div className="post-home-button">
            <Link className="btn btn-primary home" to="/">Home</Link>
          </div>
          <div className="delete-div-button">
          <button
            className="btn btn-danger delete"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
        </div>
          <div className="post-description">
            <h4 className="post-words"><span className="post-description-title">Description: </span> {post.categories}</h4>
          </div>
        </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);
