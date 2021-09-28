function App() {
  const printHello = () => {
    console.log('hello')
  };

  return (
    <>
      <button onClick={printHello}>Submit</button>
    </>
  );
}

export default App;