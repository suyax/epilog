Put React Compontents in here

Components are only concerned with presentation of props.
Components do not know how to handle events. 
Event handlers should be passed in as props.

Example:(in React, not React-native)
```javascript
const Todo = ({
  // Props
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ? 
          'line-through' :
          'none'
    }} 
  >
    {text}
  </li>
)
```
