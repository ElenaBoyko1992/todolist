import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListId: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT


export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            const newTodoListId: string = v1()
            return [...todolists, {id: newTodoListId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(t => t.id === action.todoListId ? {...t, title: action.title} : t)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todoListId: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", filter, todoListId
})
export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", title, todoListId
})