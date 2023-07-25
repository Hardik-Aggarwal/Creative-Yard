import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
const Header = () => {
  const [auth,setAuth] = useAuth();
  const handleLogOut = ()=>{
    setAuth({...auth,user:null,token:""});
    localStorage.removeItem('auth');
    toast.success("Logged Out")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to="/" className="navbar-brand">🛍️ Creative</Link>
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/yard" className="nav-link">Yard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category" className="nav-link">Category</NavLink>
          </li>
          { auth.user? 

          ( <>
             <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogOut}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>

         </>
        )
        :
        (<>
          <li className="nav-item">
          <NavLink to="/register" className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">Login In</NavLink>
        </li>
          </>)
           }
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
          </li>
        </ul>
        
      </div>
    </nav>

    </>
  )
}

export default Header