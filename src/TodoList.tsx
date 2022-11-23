import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {
    console.log('todolist')

    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }


    const tasksItems = tasks.length ? tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <ListItem key={task.id} className={task.isDone ? 'isDone' : ''}
                          style={{padding: 0}}>
                    <Checkbox
                        style={{color: "hotpink"}}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color={"primary"}
                        size="small"
                        onClick={() => props.removeTask(task.id, props.todoListId)}>
                        <HighlightOffIcon/>
                    </IconButton>
                </ListItem>

            )
        })
        : <span>Tasks list is empty</span>

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])
    const changeTodolistTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])
    const handlerCreator = useCallback((filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton
                    color="primary"
                    size="small"
                    onClick={() => props.removeTodoList(props.todoListId)}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "all" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={handlerCreator("all", props.todoListId)}>All
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "active" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={handlerCreator("active", props.todoListId)}>Active
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={handlerCreator("completed", props.todoListId)}>Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    );
})

export default TodoList;