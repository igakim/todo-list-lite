import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

class EditForm extends React.Component {
  componentDidMount() {
    const { text, description } = this.props;
    this.props.initialize({ text, description });
  }

  submitChange = (values) => {
    const { id } = this.props;
    this.props.submitChange({ ...values, id });
  }

  render() {
    return (
      <form action="" onSubmit={this.props.handleSubmit(this.submitChange)}>
        <Field className="editField" name="text" type="text" component="input" required />
        <Field className="editField" name="description" type="text" component="input" />
        <button
          type="submit"
          className="todo-list-button button-warning button-small button-round"
        >Готово</button>
      </form>
    );
  }
}

EditForm.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  initialize: PropTypes.func,
  submitChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'editForm',
})(EditForm);
