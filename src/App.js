import './App.css';
import Nabvar from './Components/Nabvar/Nabvar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import New from './Pages/New';
import Womens from './Pages/Womens';
import Mens from './Pages/Mens';
import Kids from './Pages/Kids';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product_data';
import CartPay from './Pages/CartPay';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Nabvar/>
      <Routes>
        <Route path='/' element={<New/>}/>
        <Route path='/womens' element={<Womens category='womens'/>}/>
        <Route path='/mens' element={<Mens  category='mens'/>}/>
        <Route path='/kids' element={<Kids  category='kids'/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/loginSignup' element={<LoginSignup/>}/>
        
        <Route path='/product' element={<Product/>}>
          <Route path=':productID' element={<Product/>}/>
        </Route>

        <Route path='/cart-pay' element={<CartPay/>}/>

        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
