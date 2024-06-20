import  { useReducer, useRef } from 'react';
function TaskManager() {
  const initialState = {
    tasks: []
  };

  function reducer(state, action) {
    if (action.type === 'add') {
      return {
        ...state,
        tasks: [...state.tasks, { text: action.payload, hidden: false }]
      };
    } else if (action.type === 'toggle') {
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.index ? { ...task, hidden: !task.hidden } : task
        )
      };
    } else {
      return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  function handleKey(e) {
    if (e.key === 'Enter' && e.target.value) {
      dispatch({ type: 'add', payload: e.target.value });
      e.target.value = '';
    }
  }

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div className="container">
      <input
        type="text"
        onKeyPress={handleKey}
        placeholder="Add a task"
        ref={inputRef}
        className="input"
      />
      {state.tasks.map((task, index) => (
        <div key={index} className="task">
          <h2>
            {task.hidden ? 'The content is hidden' : task.text}<br></br>
            <button onClick={() => dispatch({ type: 'toggle', index })}>
              Toggle
            </button>
          </h2>
        </div>
      ))}
      <button onClick={handleFocus}>Go back writing</button>
    </div>
  );
}

export default TaskManager;
