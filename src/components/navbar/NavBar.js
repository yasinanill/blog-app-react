import "./navbar.css";
import { Link } from "react-router-dom";
import React from "react";

export default function NavBar({ user, handleLogout }) {
  const userId = user?.uid;

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="topListItem">Home</li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="topListItem">ABOUT</li>
          </Link>{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li className="topListItem">CONTAC</li>
          </Link>{" "}
          <Link to="/write" style={{ textDecoration: "none" }}>
            <li  className="topListItem">WRITE</li>
          </Link>
        </ul>
      </div>
      {userId ? (
        <div className="topRight">
          {" "}
          <img
            className="topImg"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <ul className="topList">
           
              <li className="topListItem">{user?.displayName}</li>
           

          
              <li  onClick={handleLogout} className="topListItem">Çıkış Yap</li>
            
          </ul>
        </div>
      ) : (
        <div className="topRight">
          <ul className="topList">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li className="topListItem">LOGIN</li>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <li className="topListItem">REGISTER</li>
            </Link>
          </ul>

          <i className="topSearchIcon fas fa-search"></i>
        </div>
      )}
    </div>
  );
}
