import { useState } from 'react';

function App() {
  const [number, setNumber] = useState(1);
  const [number1, setNumber1] = useState(1);
  const double = () => {
    const doubledNumber = number * 2;
    setNumber(doubledNumber);
    setNumber(doubledNumber * 2);
    setNumber1(number1 * 2);
    console.log(doubledNumber);
  };

  return (
    <>
      <div>{number}</div>
      <div>{number1}</div>
      <button onClick={double}>
        Submit
      </button>
    </>
  );
}

export default App;