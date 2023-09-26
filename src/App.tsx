import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Add from './Add';

function App() {
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

export default App;
