import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
// import ProductList from './components/ProductList';
import ProductCards from './components/ProductCards';
function App() {
  return (
    <div className='App'>
      <Router>
      <Nav />
      <div className='body'>
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProductCards />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update' element={<h1>Update Product Page</h1>} />    
        <Route path='/profile' element={<h1>Profile Page</h1>} />      
        </Route>
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
