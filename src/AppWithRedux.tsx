import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";
import {todolistsSelector} from "./state/selectors/todolistSelector";
import {tasksSelector} from "./state/selectors/tasksSelector";

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

function AppWithRedux() {

//BLL (бизнес-логика):
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(todolistsSelector)
    const tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)

    const dispatch = useDispatch()

    //tasks CRUD
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))

        /*setTasks(tasks.filter(t => t.id !== taskID))*/
        //  console.log(tasks) //работает асинхронно!!!
    }, [dispatch])

    const addTask = useCallback( (title: string, todoListId: string) => {

        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {

        dispatch(changeTaskStatusAC(taskID, isDone, todoListId));
    },[dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId: string) => {

        dispatch(changeTaskTitleAC(taskID, title, todoListId))
    },[dispatch])

    //todolists CRUD
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        /*setTodolists(todolists.map(t => t.id === todoListId ? {...t, filter: filter} : t))*/

        dispatch(changeTodoListFilterAC(filter, todoListId))
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {

        dispatch(changeTodoListTitleAC(title, todoListId))
    },[dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    },[dispatch])

    const addTodoList = useCallback( (title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    //UI:
    // const getTasksForTodoList = (filter: FilterValuesType, tasks: Array<TaskType>) => {
    //     switch (filter) {
    //         case "active":
    //             return tasks.filter(t => !t.isDone)
    //         case "completed":
    //             return tasks.filter(t => t.isDone)
    //         default:
    //             return tasks
    //     }
    // }

    const todoListsComponents = todolists.map(tl => {
        // const filteredTasks = getTasksForTodoList(tl.filter, tasks[tl.id])
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                    {/*<TodoListWithRedux todolist={tl}/>*/}
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

export default AppWithRedux;
