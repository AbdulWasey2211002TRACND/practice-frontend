import './App.css';
import Search from './Components/Search/Search';
import RestInfo from './Components/RestuarentInfo/RestInfo';
import Booking from './Components/Booking/Booking';
import Confirmation from './Components/Confirmation/Confirmation';


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
      <Route path="/Booking" element={<Booking   />}>
      </Route>
      <Route path="/Confirmation" element={<Confirmation   />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}


export default App;
