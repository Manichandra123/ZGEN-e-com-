import './App.css'
import { Main } from './pages/main'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Admin } from './pages/admin'
import { AdminProducts } from './pages/adminProducts'
import { AddProduct } from './pages/addproduct'
import { Products } from './pages/products'
import Product from './pages/product'
  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={< Signin/>} />
        <Route path="/new-arrivals" element={<Main />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path='/product' element ={<Product/>} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
