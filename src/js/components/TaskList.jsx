import React from 'react';
import PropTypes from 'prop-types';

const filter = [['all', 'Все'], ['active', 'Активные'], ['finished', 'Завершенные']];

class TaskList extends React.Component {
  state = {
    filter: 'all',
  }

  removeArticle = id => (e) => {
    e.preventDefault();
    this.props.removeArticle({ id });
  }

  toggleArticleState = id => (e) => {
    e.preventDefault();
    this.props.toggleArticleState({ id });
  }

  toggleFilter = state => (e) => {
    e.preventDefault();
    this.setState({ filter: state });
  }

  renderFiltredList = () => {
    const title = this.state.filter === 'finished' ? 'Список завершенных дел' : 'Список незавершенных дел';
    const activateButtonTitle = this.state.filter === 'finished' ? 'Активировать задачу' : 'Завершить задачу';
    const articlesList = this.state.filter === 'active' ? this.props.activeArticles : this.props.finishedArticles;
    const finishedClass = this.state.filter === 'finished' ? ' finished' : '';
    return (
      <div className="todo-list-container">
        <h2 className="align-center">{title}</h2>
        <p className="align-center">Внимание! Если закрыть или обновить страницу - задачи исчезнут (Нет бэкэнда!)</p>
        <ul className="todo-list-main">
          {articlesList.map(({
            id, text, description,
          }) => (
            <li key={id} className={`todo-list-item${finishedClass}`}>
              <h3>{text}</h3>
              {description ? <p>{description}</p> : null}
              <button
                className="todo-list-button button-primary button-small button-round"
                onClick={this.toggleArticleState(id)}
              >{activateButtonTitle}</button>
              <button
                className="todo-list-button button-danger button-small button-round"
                onClick={this.removeArticle(id)}
              >Удалить задачу</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderAllList = () => {
    const { activeArticles, finishedArticles } = this.props;

    return (
      <div className="todo-list-container">
        <h2 className="align-center">Список всех дел</h2>
        <p className="align-center">Внимание! Если закрыть или обновить страницу - задачи исчезнут (Нет бэкэнда!)</p>
        <ul className="todo-list-main">
          {activeArticles.map(({
            id, text, description,
          }) => (
            <li key={id} className="todo-list-item">
              <h3>{text}</h3>
              {description ? <p>{description}</p> : null}
              <button
                className="todo-list-button button-primary button-small button-round"
                onClick={this.toggleArticleState(id)}
              >Завершить задачу</button>
              <button
                className="todo-list-button button-danger button-small button-round"
                onClick={this.removeArticle(id)}
              >Удалить задачу</button>
            </li>
          ))}
          {finishedArticles.map(({ id, text, description }) => (
            <li key={id} className="todo-list-item finished">
              <h3>{text}</h3>
              {description ? <p>{description}</p> : null}
              <button
                className="todo-list-button button-primary button-small button-round"
                onClick={this.toggleArticleState(id)}
              >Активировать задачу</button>
              <button
                className="todo-list-button button-danger button-small button-round"
                onClick={this.removeArticle(id)}
              >Удалить задачу</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { articles } = this.props;
    if (articles.length === 0) return null;
    return (
      <div className="todo-list">
        <div className="buttons-group">
          <h5>Фильтр:</h5>
          {filter.map(([state, name]) => {
            if (state === this.state.filter) {
              return <span key={state}>{name}</span>;
            }
            return <button
              key={state}
              className={`filter-${state}`}
              onClick={this.toggleFilter(state)}
            >{name}</button>;
          })}
        </div>
        {this.state.filter === 'all' ? this.renderAllList() : this.renderFiltredList()}
      </div>
    );
  }
}

TaskList.propTypes = {
  articles: PropTypes.array,
  removeArticle: PropTypes.func,
  toggleArticleState: PropTypes.func,
  activeArticles: PropTypes.array,
  finishedArticles: PropTypes.array,
};

export default TaskList;
