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
      <label>{field.label}</label>
      <input
        className="form-control"
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
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
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
           <button type="submit" className="btn btn-primary">Submit</button>
           <Link to="/" className="btn btn-danger cancel-btn">Cancel</Link>
      </form>
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
