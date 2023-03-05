import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(curr => {
      return curr + 1;
    });
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>+</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>Hello React App!</h1>
      <Counter />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));