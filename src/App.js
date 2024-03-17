import './App.css';
import Nabvar from './Components/Nabvar/Nabvar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import New from './Pages/New';
import Womens from './Pages/Womens';
import Mens from './Pages/Mens';
import Kids from './Pages/Kids';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Product from './Pages/Product_data';
import CartPay from './Pages/CartPay';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';
import Signup from './Pages/Signup';
import Orders from './Pages/Orders';
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
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
        <Route path='/product' element={<Product/>}>
          <Route path=':productID' element={<Product/>}/>
        </Route>

        <Route path='/cart-pay' element={<CartPay/>}/>
        <Route path='/orders' element={<Orders/>}/>

        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
