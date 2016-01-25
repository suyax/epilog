Put React-Redux container components in here

Containers combine components and assign event handlers

Example:(in React not React-native)
```javascript
const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    // AddTodo is a component
    // it doesn't know how to handle events
    <AddTodo
      // passing an event handler as a prop
      onAddclick={text =>
        store.distpatch({
          type:'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
    />
    // TodoList is a container of Todos
    // TodoList does not handle events
    <TodoList 
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter
        )
      }
      // passing an event handler as a prop
      onTodoClick={id =>
        store.dispatch({
          type:'TOGGLE_TODO',
          id
        })
      }
    />
    // Footer is a component
    // it doesn't know how to handle events
    <Footer
      visibilityFilter={visibilityFilter}
      // passing an event handler as a prop
      onFilterClick={filter =>
        store.dispatch({
          type:'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
);
```
