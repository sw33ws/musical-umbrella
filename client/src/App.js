<<<<<<< HEAD
// import Contact from "client/src/component/Contact/Contact.js";
// import Footer from "client/src/component/Footer/Footer.js";
import './App.css';
=======
import Contact from "client/src/component/Contact/Contact.js";
import Footer from "client/src/component/Footer/Footer.js";
import "./App.css";
import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
>>>>>>> 9126bf294ab4feaa64a4b2c74b343bcaac39df72

function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
Git Commit: A Meeting of Charity.</a>
      </header>
    </div>
=======
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </>
>>>>>>> 9126bf294ab4feaa64a4b2c74b343bcaac39df72
  );
}

export default App;
