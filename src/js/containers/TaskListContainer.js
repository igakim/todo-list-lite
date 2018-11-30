import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from '../components/TaskList.jsx';
import * as actionCreators from '../actions';

const getArticles = state => state.articles;

const articleList = createSelector(
  getArticles,
  articles => Object.values(articles).reverse(),
);

const finishedArticleList = createSelector(
  articleList,
  articles => articles.filter(el => el.state === 'finished').reverse(),
);

const activeArticleList = createSelector(
  articleList,
  articles => articles.filter(el => el.state === 'active').reverse(),
);

const allArticles = createSelector(
  finishedArticleList,
  activeArticleList,
  (finishedArticles, activeArticles) => activeArticles.concat(finishedArticles),
);

const mapStateToProps = state => ({
  articles: allArticles(state),
  finishedArticles: finishedArticleList(state),
  activeArticles: activeArticleList(state),
});

export default connect(mapStateToProps, actionCreators)(Component);
