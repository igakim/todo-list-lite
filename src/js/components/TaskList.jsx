import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditForm from '../containers/EditFormContainer';

const filter = [
  ['all', 'Все', 'Список всех задач', 'articles'],
  ['active', 'Активные', 'Список активных задач', 'activeArticles'],
  ['finished', 'Завершенные', 'Список завершенных задач', 'finishedArticles'],
];

class TaskList extends React.Component {
  state = {
    filter: {
      state: 'all',
      title: 'Список всех задач',
      articles: 'articles',
    },
  }

  removeArticle = id => (e) => {
    e.preventDefault();
    this.props.removeArticle({ id });
  }

  toggleArticleState = id => (e) => {
    e.preventDefault();
    this.props.toggleArticleState({ id });
  }

  toggleFilter = (state, title, articles) => (e) => {
    e.preventDefault();
    this.setState({ filter: { state, title, articles } });
  }

  editArticle = id => (e) => {
    e.preventDefault();
    this.props.editArticle({ id });
  }

  renderAllList = articles => (
    <div className="todo-list-container">
      <h2 className="align-center">{this.state.filter.title}</h2>
      <p className="align-center">Внимание! Если закрыть или обновить страницу - задачи исчезнут (Нет бэкэнда!)</p>
      <ul className="todo-list-main">
        {articles.map(({
          id, text, description, state, isEdit,
        }) => (
          <li key={id} className={`todo-list-item ${state === 'finished' ? 'finished' : ''}`}>
            {isEdit ? <EditForm id={id} text={text} description={description} /> : (
              <div>
                <h3>{text}</h3>
                <p>{description}</p>
              </div>
            )}
            <button
              className="todo-list-button button-primary button-small button-round"
              onClick={this.toggleArticleState(id)}
            >{state === 'finished' ? 'Активировать задачу' : 'Завершить задачу'}</button>
            <button
              className="todo-list-button button-danger button-small button-round"
              onClick={this.removeArticle(id)}
            >Удалить задачу</button>
            <button className="edit" onClick={this.editArticle(id)}><FontAwesomeIcon icon="edit" /></button>
          </li>
        ))}
      </ul>
    </div>
  )

  render() {
    const articles = this.props[this.state.filter.articles];
    const allArticles = this.props.articles;
    if (allArticles.length === 0) return null;
    return (
      <div className="todo-list">
        <div className="buttons-group">
          <h5>Фильтр:</h5>
          {filter.map(([state, name, title, curArticles]) => {
            if (state === this.state.filter.state) {
              return <span key={state} className="filter filter-current">{name}</span>;
            }
            return <button
              key={state}
              className={`filter filter-${state}`}
              onClick={this.toggleFilter(state, title, curArticles)}
            >{name}</button>;
          })}
        </div>
        {this.renderAllList(articles)}
      </div>
    );
  }
}

TaskList.propTypes = {
  articles: PropTypes.array,
  removeArticle: PropTypes.func,
  toggleArticleState: PropTypes.func,
  editArticle: PropTypes.func,
  activeArticles: PropTypes.array,
  finishedArticles: PropTypes.array,
};

export default TaskList;
