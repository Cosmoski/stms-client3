import React, { useState } from 'react';
import axios from "axios";
import FilterForm from './components/FilterForm'
import AddTaskForm from './components/AddTaskForm';
import TaskListForm from './components/TaskListForm';
import TestOcelotLabel from './components/TestOcelotLabel';

const App: React.FC = () => {
  
  return (
    <div>   
      <TestOcelotLabel/>
      <AddTaskForm/>   
      <FilterForm/>
      <TaskListForm/> 
    </div>
  )
};

export default App;
