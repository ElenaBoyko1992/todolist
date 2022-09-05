import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length ? props.tasks.map(task => {
            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <input onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked)}
                           type="checkbox"
                           checked={task.isDone}

                    />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>

            )
        })
        : <span>Tasks list is empty</span>

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }
    const addTask = () => {
        let trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    let userMessage =
        error
            ? <div style={{color: "hotpink"}}>Title is required!</div>
            : <div>Please, create list item</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={changeTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {userMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active btn" : "btn"}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active btn" : "btn"}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active btn" : "btn"}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;