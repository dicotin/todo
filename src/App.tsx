import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
export type FilterType = 'all' | 'active' | 'completed'
function App() {
    let [tasks,setTasks] = useState<Array<TaskType>>([
        {id:v1(),title:'HTML&CSS',isDone:true},
        {id:v1(),title:'JS',isDone:true},
        {id:v1(),title:'React',isDone:false},
        {id:v1(),title:'RestAPI',isDone:false},
        {id:v1(),title:'GraphQL',isDone:false},
    ]);
    let [filter,setFilter] = useState<FilterType>('all');
    const removeTask = (id:string) =>{
        let filteredTasks = tasks.filter( task => task.id !== id);
        setTasks(filteredTasks);
    }
    const addTask = (title:string) =>{
        let newTask = {id:v1(),title:title,isDone:false};
        let newTasks = [newTask,...tasks];
        setTasks(newTasks);
    }
    const changeTaskStatus = (taskId:string,isDone:boolean) =>{
        let task = tasks.find((t)=>t.id === taskId);
        if(task){
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }
    const changeFilter = (value:FilterType) => {
        setFilter(value);
    }
    let tasksForTodolist = tasks;
    if(filter ==='completed'){
        tasksForTodolist = tasks.filter(t=>t.isDone)
    }
    if(filter ==='active'){
        tasksForTodolist = tasks.filter(t=>!t.isDone)
    }

    return (
        <div className="App">
            <Todolist title= 'What to learn' tasks={tasksForTodolist} removeTask = {removeTask} changeFilter = {changeFilter}
                      addTask={addTask} changeTaskStatus = {changeTaskStatus} filter = {filter}/>
        </div>
    );
}

export default App;
