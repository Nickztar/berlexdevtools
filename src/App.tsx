import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Login } from './components/Login';

function App() {
  useEffect(() => {
    fetch("https://api-test.berlexconnect.com/api/v1/country").then(res => res.json()).then(data => { console.log(data) });
  }, [])


  return (
    <Login />
    // <div className="App">
    //   <header className="App-header">
    //     <Button>Berlex Devtools</Button>
    //   </header>
    // </div>
  );
}

export default App;
