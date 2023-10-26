import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    let todoList1 = v1();
    let todoList2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoList1, title: 'What to learn', filter: 'all'},
        {id: todoList2, title: 'What to buy', filter: 'active'},
    ])
    let [tasks, setTasks] = useState({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: false},
        ]
    });

    const removeTask = (id: string, idList: string) => {
        let filteredTasks = tasks[idList].filter(task => task.id !== id);
        tasks[idList] = filteredTasks;
        setTasks({...tasks})
    }
    const addTask = (title: string, idList: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let taskList = tasks[idList];
        let newTasks = [newTask, ...taskList];
        tasks[idList] = newTasks;

        setTasks({...tasks});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, idList: string) => {
        let tasksList = tasks[idList];
        let task = tasksList.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }

    }
    const changeFilter = (value: FilterType, todoListId: string) => {
        let todoList = todoLists.find((tl) => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    const removeTodolist = (todolistId: string) => {
        const filteredLists = todoLists.filter((e) => e.id !== todolistId);
        setTodoLists(filteredLists);

        delete tasks[todolistId];
        setTasks({...tasks});
    }
    const addTodoList = (title: string, idList: string,) => {
        let newTodoList: TodoListsType = {id: idList, title: title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists]);
        tasks[idList] = [];
        setTasks({...tasks});
    }
    const changeTaskTitle = (taskId: string, title: string, idList: string) => {
        let task = tasks[idList].find((t) => t.id === taskId);
        if (task) {
            task.title = title
        }
        setTasks({...tasks});
    }
    const changeTitleTodolist = (idList: string, title: string) => {
        let todoList = todoLists.find((td) => td.id === idList);
        if (todoList) {
            todoList.title = title;
        }
        setTodoLists([...todoLists]);
    }
    return (
        <div className="App">
            <AddItemForm id={v1()} addItem={addTodoList}/>
            {todoLists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                return <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter} removeTodolist={removeTodolist}
                                 addTask={addTask} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus}
                                 filter={tl.filter} changeTitleTodolist={changeTitleTodolist}/>
            })}

        </div>
    );
}

export default App;
