import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Add from '../pages/Add';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='add' element={<Add />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
