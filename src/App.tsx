import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CLI - интерфейс командной строки
//GUI - графический интерфейс - create, read, update, delete => CRUD

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

//BLL (бизнес-логика):
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn today", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS&TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "FISH", isDone: false},
        ]

    })

    const removeTask = (taskId: string, todoListId: string) => {
        /*        const todoListTasks = tasks[todoListId]
                const updatedTasks = todoListTasks.filter(t => t.id !== taskId)
                const copyTask = {...tasks}
                copyTask[todoListId] = updatedTasks
                setTasks(copyTask)*/
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

        /*setTasks(tasks.filter(t => t.id !== taskID))*/
        //  console.log(tasks) //работает асинхронно!!!
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        /*        const todoListsTasks = tasks[todoListId]
                const updatedTask = [newtask, ...todoListsTasks]
                const copyTask = {...tasks}
                copyTask[todoListId] = updatedTask
                setTasks(copyTask)*/
        //
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }

    const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        /*        const todoListsTasks = tasks[todoListId]
                const updatedTasks = todoListsTasks.map(t => t.id === taskID ? {...t, isDone} : t)
                const copyTask = {...tasks}
                copyTask[todoListId] = updatedTasks
                setTasks(copyTask)*/
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)
        })

    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolists(todolists.map(t => t.id === todoListId ? {...t, filter: filter} : t))
    }

    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListId))
    }

    //UI:
    const getTasksForTodoList = (filter: FilterValuesType, tasks: Array<TaskType>) => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListsComponents = todolists.map(tl => {
        const filteredTasks = getTasksForTodoList(tl.filter, tasks[tl.id])
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
