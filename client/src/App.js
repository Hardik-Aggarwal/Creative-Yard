import './App.css';
import "./components/Layout/Layout";
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import About from './pages/About';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from "./pages/Admin/Products"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-products' element={<CreateProduct/>}/>
          <Route path='admin/users' element={<Users/>}/>
          <Route path='admin/products' element={<Products/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/*' element={<Pagenotfound/>}/>
      </Routes>
      
    </>
  );
}

export default App;
