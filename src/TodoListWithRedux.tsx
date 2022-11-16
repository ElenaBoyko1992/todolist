import React, {ChangeEvent, FC} from 'react';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {TasksStateType, TodoListType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./TodoList";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/todolists-reducer";

export type TodoListWithReduxPropsType = {
    todolist: TodoListType
}

const TodoListWithRedux: FC<TodoListWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch();

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodoList = () => {
        dispatch(removeTodoListAC(id))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(title, id))
    }

    const onAllClickHandler = () => dispatch(changeTodoListFilterAC('all', id))
    const onActiveClickHandler = () => dispatch(changeTodoListFilterAC('active', id))
    const onCompletedClickHandler = () => dispatch(changeTodoListFilterAC('completed', id))

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const tasksItems = tasks.length ? tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                dispatch(changeTaskTitleAC(task.id, title, id))
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id));
            }
            const onClickHandler = () => {
                // () => props.removeTask(task.id, props.todoListId)
                dispatch(removeTaskAC(task.id, id))
            }


            return (
                <ListItem key={task.id} className={task.isDone ? 'isDone' : ''}
                          style={{padding: 0}}>
                    <Checkbox
                        style={{color: "hotpink"}}
                        onChange={onChangeHandler}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color={"primary"}
                        size="small"
                        onClick={onClickHandler}>
                        <HighlightOffIcon/>
                    </IconButton>
                </ListItem>

            )
        })
        : <span>Tasks list is empty</span>


    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    color="primary"
                    size="small"
                    onClick={removeTodoList}>
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
                        color={filter === "all" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={filter === "active" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={filter === "completed" ? "secondary" : "primary"}
                        style={{marginRight: "3px"}}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    );
};

export default TodoListWithRedux;