import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';

export const addArticle = createAction('ADD_ARTICLE', article => (
  { article: { id: uniqueId(), state: 'active', ...article } }
));
export const removeArticle = createAction('REMOVE_ARTICLE');
export const toggleArticleState = createAction('TOGGLE_ARTICLE_STATE');
