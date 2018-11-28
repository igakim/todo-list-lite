import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import App from '../components/App.jsx';

const getArticles = state => state.articles;

const articleList = createSelector(
  getArticles,
  articles => Object.values(articles),
);

const mapStateToProps = state => ({
  articles: articleList(state),
});

export default connect(mapStateToProps)(App);
