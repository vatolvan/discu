import * as React from 'react';

const { useState } = React;

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (<div>
    {count}</div>);
}

export default App;