
import React, { useState } from 'react'

export default function FunctionComponent(props) {

    const [count, setCount] = useState(0)

    // const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

  return (
    <div>
        <p>this is a Function Component {props.value}</p>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
