import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Signup from './components/Signup';
import Forgetpass from './components/Forgetpass';
import VerifyOTP from './components/VerifyOTP';
import NewPass from './components/NewPass';
import CreateProduct from './HomePage/ProductComponents/CreateProduct';
import HomeComponenet from './HomePage/HomeComponenet';
import AllProducts from './HomePage/ProductComponents/AllProducts';
import UpdateProduct from './HomePage/ProductComponents/UpdateProduct';
import ProductDetail from './HomePage/ProductComponents/ProductDetail';
// import Navbar from './HomePage/Navbar';



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<Navbar />}/> */}
        <Route exact path='/user/login' element={<Login />}/>
        <Route path='/user/signup' element={<Signup />}/>
        <Route path='/user/forgot-password' element={<Forgetpass />}/>
        <Route path='/user/verify-otp' element={<VerifyOTP />}/>
        <Route path='/user/new-password' element={<NewPass />}/>
        <Route path='/product/create' element={<CreateProduct />}/>
        <Route path='/home' element={<HomeComponenet />}/>
        <Route exact path='/' element={<AllProducts />}/>
        <Route path='/product/update/:id' element={<UpdateProduct />}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        </Routes>
    </Router>
  );
}


export default App;
