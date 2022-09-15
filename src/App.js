import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Containers/Home/Home';
import Register from './Containers/Register/Register';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
