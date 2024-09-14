import {createContext, useContext} from 'react'

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "My todo title",
            completed: false,
        }
    ],
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    toggleComplete: () => {},
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}