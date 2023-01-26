
//todo - dodac reduxowa obsłyge stanu dla radiobuttonow itd

import React, { useState } from 'react';
import axios from "axios";
import FilterForm from './components/FilterForm'
import AddTaskForm from './components/AddTaskForm';
import TaskListForm from './components/TaskListForm';

const App: React.FC = () => {

  const[dataSource, setDataSource] = useState([]); 

  const baseURL = "https://localhost:7214/api/task"; 
  
  async function GetTaskWithParams(params:any)
  {
    await axios.get(baseURL, {params, headers:{'Content-Type': 'application/json; charset=utf-8'}}).then((response) =>{
      setDataSource(response.data);
    });  
  }  

  return (
    <div>   
      <AddTaskForm/>   
      <FilterForm/>
      <TaskListForm/> 
    </div>
  )
};

export default App;
