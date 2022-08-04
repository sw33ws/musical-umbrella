import './App.css';
import Navbar from '../src/components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Commits from './Pages/Commits';
import Menu from '../src/components/Menu';
import { useState } from 'react';
import SignIn from './Pages/SignIn';



function App() {

  const[clicked,isClicked] = useState(false)
  return (

    <Router>
  <Navbar clicked={clicked} isClicked={isClicked}/>
  {clicked?<Menu/>:null}
    <Routes>
      <Route exact path="" element={<Home />} />
      <Route exact path="profile" element={<Profile />} />
      <Route exact path="commits" element={<Commits />}/>
      <Route exact path="sign-in" element={<SignIn />}/>

    </Routes>
    </Router>

  );
}

export default App;