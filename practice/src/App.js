import './App.css';
import Search from './Components/Search/Search';
import RestInfo from './Components/RestuarentInfo/RestInfo';
import Booking from './Components/Booking/Booking';
import Confirmation from './Components/Confirmation/Confirmation';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';


import {
  BrowserRouter,
  Routes,
  Route,
  
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login   />}>
      </Route>
      <Route path="/Admin" element={<Admin   />}>
      </Route>
      <Route path="/Restuarent" element={<RestInfo   />}>
      </Route>
      <Route path="/Search" element={<Search   />}>
      </Route>
      <Route path="/Booking" element={<Booking   />}>
      </Route>
      <Route path="/Confirmation" element={<Confirmation   />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}


export default App;
