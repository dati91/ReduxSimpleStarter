import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const InputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
  }) =>
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} className="form-control" />
      </div>
      {touched &&
        ((error && <span className="has-danger">{error}</span>) ||
          (warning && <span className="has-danger">{warning}</span>))}
    </div>;

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onPostSubmit(props) {
        this.props.createPost(props)
        .then(() => this.context.router.push('/'));
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onPostSubmit.bind(this))}>
                <h3>Create a new post</h3>

                <div className="form-group">
                    <Field name="title" component={InputField} type="text" label="Title" />
                </div>

                <div className="form-group">
                    <Field name="categories" component={InputField} type="text" label="Categories" />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <Field name="content" component="textarea" className="form-control" />
                </div>

                <button tpye="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Enter a title';
    }

    if(!values.categories) {
        errors.categories = 'Enter categories';
    }

    return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    validate
})(
    connect(null, {createPost})(PostsNew)
);
