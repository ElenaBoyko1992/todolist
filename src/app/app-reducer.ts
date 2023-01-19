//app-reducer.tsx


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'loadingFile'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)

export type AppActionsType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
