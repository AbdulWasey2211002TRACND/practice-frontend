import './App.css';
import Home from './Components/Home/Home';
import Confirmation from './Components/Confirmation/Confirmation';
import Product from './Components/ProductInfo/Product';
import Cart from './Components/Cart/Cart';



import {
  BrowserRouter,
  Routes,
  Route,
  
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home   />}>
      </Route>
      <Route path="/Product" element={<Product   />}>
      </Route>
      <Route path="/Confirmation" element={<Confirmation   />}>
      </Route>
      <Route path="/Cart" element={<Cart   />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}


export default App;
