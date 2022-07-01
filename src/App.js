import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Homepage from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";
import { useState, useEffect } from "react";
import { auth, } from "./firebase";
import { signOut } from "firebase/auth";
import SinglePost from "./components/singlePost/SinglePost";
import { Toaster } from "react-hot-toast";

function App() {
  const [active, setActive] = useState("/");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };
  return (
    <>
      <NavBar  setActive={setActive}
          active={active}
          user={user}
          handleLogout={handleLogout}/>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Routes>
        <Route
          path="/"
   
          element={<Homepage setActive={setActive} user={user} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/single" element={<Single />} />
        <Route path="/write" 
         element={user?.uid ?   <Write  user={user} /> : <Navigate to="/" />} />
          <Route path="/write/:id" 
         element={user?.uid ?   <Write  user={user} setActive={setActive}  /> : <Navigate to="/" />} />
     
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<SinglePost user={user} setActive={setActive}/>} />
      </Routes>
    </>
  );
}

export default App;
