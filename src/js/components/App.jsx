import React from 'react';
import TaskFormContainer from '../containers/TaskFormContainer';
import TaskListContainer from '../containers/TaskListContainer';

const App = () => (
    <div className="todo-app">
      <h1 className="align-center">Менеджер задач Lite</h1>
      <TaskFormContainer />
      <TaskListContainer />
    </div>
);

export default App;
