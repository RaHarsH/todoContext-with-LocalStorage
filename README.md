# Todo App with Context API and Local Storage

## Overview

This is a simple Todo application created using React's Context API and local storage. The app retains the user's tasks (todos) even after a page refresh, thanks to local storage. I learned how to create a custom context, `TodoContext`, to manage the state of the todos and how to persist them using the browser's local storage.

## Features
- **Add Todos:** Users can add new tasks.
- **Update Todos:** Edit existing tasks.
- **Delete Todos:** Remove tasks that are no longer needed.
- **Mark as Complete:** Toggle the status of tasks between complete and incomplete.
- **Local Storage:** All todos are stored in local storage, allowing data persistence even after a page refresh.

## Learning Highlights

### 1. **Creating the `TodoContext`:**
Using React's `createContext`, I learned how to create a context (`TodoContext`) to manage todos globally across the app. This allowed for the seamless sharing of state and functions (add, update, delete, toggle) across different components without having to pass props manually.

```javascript
import { createContext, useContext } from 'react';

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
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
```

### 2. **Using Local Storage:**
I used the `localStorage` API to store todos in the browser's local storage. Since local storage only accepts data in string format, I had to serialize and deserialize the todos using `JSON.stringify()` and `JSON.parse()`.

- **Fetching from Local Storage:** On app load, I retrieve the stored todos from local storage (if available) and update the state accordingly.

```javascript
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);
```

- **Storing in Local Storage:** Whenever there's a change in the todos (such as adding, deleting, or updating), I update the local storage to persist the new state.

```javascript
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### 3. **Efficient State Management:**
By combining the Context API and local storage, I was able to create a system where todos are globally accessible and persistent across sessions.

## Conclusion

This project helped me understand the importance of state management in React applications using the Context API and how to leverage browser storage mechanisms like `localStorage` to retain user data. It provides a simple, yet effective, way to manage todo tasks that remain accessible across page reloads or app restarts.