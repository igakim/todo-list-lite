import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import app from './js/index.jsx';
import 'mustard-ui';
import './scss/index.scss';

library.add(faPlus, faEdit);

app();
