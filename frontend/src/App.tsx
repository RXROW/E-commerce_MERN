 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Register from './pages/Register'
import AuthProvider from './context/ProviderContext'
import  Login  from './pages/Login'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
 

function App() {
 
  return (
    <>
    <AuthProvider>


      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/cart' element={<Cart/>}/> 
          </Route> 

      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
