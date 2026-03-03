import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Edit/:id' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
