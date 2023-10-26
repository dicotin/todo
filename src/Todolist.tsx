import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, idList: string) => void
    changeFilter: (filter: FilterType, todoListId: string) => void
    addTask: (newTaskTitle: string, idList: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, idList: string) => void
    changeTaskTitle: (taskId: string, title: string, idList: string) => void
    removeTodolist: (listId: string) => void
    changeTitleTodolist: (listId: string,title:string) => void
    filter: FilterType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const changeFilter = (value: FilterType) => {
        props.changeFilter(value, props.id);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTitleTodolist = (title:string) =>{
        props.changeTitleTodolist(props.id,title);
    }
    let liArray = props.tasks.map((task) => {
        const onRemoveHandler = () => {
            props.removeTask(task.id, props.id);
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
        }
        const onChangeTaskTitleHandler = (title:string) => {
            props.changeTaskTitle(task.id, title, props.id);
        }
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       onChange={onChangeStatusHandler}
                       checked={task.isDone}/>
                <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler}/>
                <button onClick={onRemoveHandler}>X</button>
            </li>
        );
    })
    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} changeTitle={changeTitleTodolist}/>
                    <button onClick={removeTodolist}>X</button>
                </h3>
                <AddItemForm addItem={props.addTask} id={props.id}/>
                <ul>
                    {liArray}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={() => changeFilter('all')}>All
                    </button>

                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={() => changeFilter('active')}>Active
                    </button>

                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={() => changeFilter('completed')}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
}
