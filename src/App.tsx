import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//CLI - интерфейс командной строки
//GUI - графический интерфейс - create, read, update, delete

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL (бизнес-логика):
    const todoListTitle: string = "What to learn today"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        //  console.log(tasks) //работает асинхронно!!!
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const getTasksForTodoList = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
