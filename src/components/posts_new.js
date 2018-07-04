import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type="text"
        {...field.input}
      />
      <div className="text-danger">
      {touched ? error : ''}
      </div>
    </div>
  )
}

onSubmit(values) {
  console.log(values);
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
           label="Categories"
           name="categories"
           component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
           />
           <Field
             label="Post Pics & Gifs"
             name="media"
             component={this.renderField}
            />
           <button type="submit" className=" btn btn-primary">Submit</button>
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
    errors.categories = "Enter A Category";
  }

  if(!values.content) {
    errors.content = "Enter A Description";
  }

  if(!values.media) {
    errors.media = "Enter A Url or Upload";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
