import React, {ChangeEvent, useState, KeyboardEvent, ChangeEventHandler} from 'react';
import {FilterType} from "./App";
type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask : (id:string) => void
    changeFilter:(filter:FilterType)=>void
    addTask:(newTaskTitle:string)=>void
    changeTaskStatus:(taskId:string,isDone:boolean) => void
    filter:FilterType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle,setNewTaskTitle] = useState('');
    const [error,setError] = useState<string|null>(null);
    const changeFilter = (value:FilterType) =>{
        props.changeFilter(value);
    }
    const addTask = () =>{
        if(newTaskTitle.trim() === ''){
            setError('Title is required');
            return;
        }
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle('');
    }
    const changeInputTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    };
    const setTaskOnKeyPress = (e:KeyboardEvent<HTMLInputElement>) =>{
            if(e.key == "Enter"){
                props.addTask(newTaskTitle);
                setNewTaskTitle('');
            }
    }
    let liArray = props.tasks.map((task) => {
        const onRemoveHandler = () =>{
            props.removeTask(task.id);
        }
        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id,e.currentTarget.checked);
        }
        return (
            <li key={task.id} className={task.isDone?'is-done':''}>
                <input type="checkbox"
                       onChange={onChangeStatusHandler}
                       checked={task.isDone}/>
                <span>{task.title} </span>
                <button onClick={onRemoveHandler}>X</button>
            </li>
        );
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input className={error ? 'error':''} value={newTaskTitle} onChange={changeInputTaskTitle} onKeyDown={setTaskOnKeyPress}/>
                    <button onClick={addTask}>+</button>
                    {error && <div className='error-message'> {error} </div>}
                </div>
                <ul>
                    {liArray}
                </ul>
                <div>
                    <button className={props.filter === 'all'?'active-filter':''}
                            onClick={()=> changeFilter('all')}>All</button>

                    <button className={props.filter === 'active'?'active-filter':''}
                            onClick={()=> changeFilter('active')}>Active</button>

                    <button className={props.filter === 'completed'?'active-filter':''}
                            onClick={()=> changeFilter('completed')}>Completed</button>

                </div>
            </div>
        </div>
    );
}