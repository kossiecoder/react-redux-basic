function App() {
  const number = 1;

  const double = (number) => {
    return number * 2;
  };

  return (
    <div>{double(number)}</div>
  );
}

export default App;