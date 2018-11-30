import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { omit, mapValues } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const articles = handleActions({
  [actions.addArticle](state, { payload: { article } }) {
    return { [article.id]: article, ...state };
  },
  [actions.removeArticle](state, { payload: { id } }) {
    return omit(state, id);
  },
  [actions.toggleArticleState](state, { payload: { id } }) {
    return mapValues(state, (val, key) => {
      const articleState = val.state === 'finished' ? 'active' : 'finished';
      if (key === id) return { ...val, state: articleState };
      return val;
    });
  },
  [actions.editArticle](state, { payload: { id } }) {
    return mapValues(state, (val, key) => {
      if (key === id) return { ...val, isEdit: true };
      return val;
    });
  },
  [actions.submitChange](state, { payload: { text, description, id } }) {
    return mapValues(state, (val, key) => {
      if (key === id) {
        return {
          ...val, text, description, isEdit: false,
        };
      }
      return val;
    });
  },
}, {});

export default combineReducers({ articles, form: formReducer });
