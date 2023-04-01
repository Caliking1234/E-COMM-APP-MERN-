import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
  }
    return (
      <div className="nav">
        { auth ?
        <ul className="nav-ul">
          <li><Link to={"/"}>Product</Link></li>
          <li><Link to={"/add"}>Add</Link></li>
          <li><Link to={"/update"}>Update</Link></li>
          <li><Link to={"/profile"}>Profile</Link></li>
          <li><Link onClick={logout} to={'/login'}>logout({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul className="nav-ul nav-right">
            <li><Link to={"/signup"}>Sign-Up</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
        </ul>
        }
      </div>
    );
  }
  
  export default Nav;