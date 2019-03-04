import * as React from "react";

import Counter from "./Counter/Counter";

const { useState } = React;

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);

  function increment(): void {
    setCount(count + 1);
  }

  function decrement(): void {
    setCount(count - 1);
  }

  return <Counter count={count} increment={increment} decrement={decrement} />;
};

export default App;
