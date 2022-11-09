import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

//CLI - интерфейс командной строки
//GUI - графический интерфейс - create, read, update, delete => CRUD

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
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

    //tasks CRUD
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
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
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
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title} : t)
        })

    }

    //todolists CRUD
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolists(todolists.map(t => t.id === todoListId ? {...t, filter: filter} : t))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodolists(todolists.map(t => t.id === todoListId ? {...t, title} : t))
    }
    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListId))
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        setTodolists([...todolists, {id: newTodoListId, title, filter: 'all'}])
        setTasks({...tasks, [newTodoListId]: []})
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
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <TodoList
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} justifyContent="center">
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
