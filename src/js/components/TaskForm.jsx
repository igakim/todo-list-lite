import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TaskForm extends React.Component {
  addArticle = (values) => {
    this.props.addArticle(values);
    this.props.reset();
  }

  render() {
    return (
      <form action="" className="form-group" onSubmit={this.props.handleSubmit(this.addArticle)}>
        <div className="form-control">
            <label htmlFor="task-title" className="align-left">Введите название:</label>
            <Field name="text" id="task-title" type="text" required component="input" placeholder="Сдать первый шаг в проекте"/>
        </div>

        <div className="form-control">
            <label htmlFor="task-desc" className="align-left">Введите описание:</label>
            <Field name="description" id="task-desc" type="text" component="input" placeholder="Нужно успеть до 6 утра"/>
        </div>
        <button type="submit">Добавить задачу <FontAwesomeIcon icon="plus" /></button>
      </form>
    );
  }
}

TaskForm.propTypes = {
  handleSubmit: PropTypes.func,
  addArticle: PropTypes.func,
  reset: PropTypes.func,
  text: PropTypes.string,
};

export default reduxForm({
  form: 'articleForm',
})(TaskForm);
