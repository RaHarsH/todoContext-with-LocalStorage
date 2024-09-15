import { TodoForm, TodoItem } from "./components";
import { TodoProvider } from "./contexts"
import {useEffect, useState} from 'react'

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos( (prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos] )
    // console.log(`This is a todo obj : ${todo}`)
  }

  const updateTodo = (id, todo) => {
    setTodos( (prevTodos) => prevTodos.map( (prevTodo) => prevTodo.id === id ? todo : prevTodo ) )
  }

  const deleteTodo = (id) => {
    setTodos( (prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id ) )
  }
  
  const toggleComplete = (id) => {
    setTodos( (prevTodos) => prevTodos.map( (prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ) )
  }

  useEffect(() => {
    // provide the key when getting the item
    const todos = JSON.parse(localStorage.getItem("todos")) // in local storage data is stored in the form of string so convert it to json (object form)
    
    if(todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  // whenever there is any change in the todos array this useEffect will run and again it will set the item in the local storage
  useEffect(() => {
    // provide key and value when setting the item
    localStorage.setItem("todos", JSON.stringify(todos)) // u need to store the data  in string format
  }, [todos])

  return (
    <TodoProvider value={ {todos, addTodo, updateTodo, deleteTodo, toggleComplete} }>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map( (todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ) )}
            </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
