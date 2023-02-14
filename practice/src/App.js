import './App.css';
import Search from './Components/Search/Search';
import RestInfo from './Components/RestuarentInfo/RestInfo';


import {
  BrowserRouter,
  Routes,
  Route,
  
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search   />}>
      </Route>
      <Route path="/Restuarent" element={<RestInfo   />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}


export default App;
