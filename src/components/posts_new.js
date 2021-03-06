import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost }  from '../actions';

class PostsNew extends Component {

renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  return (
    <div className={className}>
      <label className="form-headers">{field.label}</label>
      <input
        className="form-control form-inputs"
        {...field.input}
      />
      <div className="text-danger">
      {touched ? error : ''}
      </div>
    </div>
  )
}

renderMedia(field) {
  return (
    <div>
      <label>{field.label}</label>
      <input
        type="file"
        {...field.input}
      />
    </div>
  )
}

onSubmit(values) {
  this.props.createPost(values,() => {
    this.props.history.push("/");
  });
}

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="main-form-div">
        <h1 className="form-title">Create a Gif or Pic </h1>
      <form className="sub-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          className="form-title-input"
          label="Title"
          name="title"
          component={this.renderField}
         />
         <Field
           label="Content"
           name="categories"
           component={this.renderField}
          />
        <Field
          label="Enter a Url"
          name="content"
          component={this.renderField}
          />
           <button type="submit" className="btn btn-primary button-submit-form">Submit</button>
           <Link to="/" className="btn btn-danger cancel-btn">Cancel</Link>
      </form>
    </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title || values.title.length < 3 ) {
    errors.title = "Enter a Title at least 3 characters";
  }

  if(!values.categories) {
    errors.categories = "Enter A Description";
  }

  if(!values.content) {
    errors.content = "Enter A Url or Upload";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
