import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
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

const initialState: Array<TodoListType> = []

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT


export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            const newTodoListId: string = action.todolistId
            return [...todolists, {id: newTodoListId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(t => t.id === action.todoListId ? {...t, title: action.title} : t)
        default:
            return todolists
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todoListId: id})
export const addTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", filter, todoListId
})
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", title, todoListId
})

