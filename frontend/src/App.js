// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Routes, and Route
import Articles from './components/articles';
import UserLogin from './components/userLogin';
import StartPage from './components/startPage';
import HomePage from './components/homePage';
import SignCard from './components/signCard';
import UserSignUp from './components/signUp';
import AnswersPage from './components/answerPage';
import DoctorLogin from './components/docLogin';
import DocParent from './components/Docparent'
import UserProfile from './components/UserProfile'
import EditProfile from './components/Editprofile'
function App() {
  return (
    
    <Router>
        <Routes>
        
        <Route path="/" element={<StartPage />} />       
        <Route path="/userLogin" element={<UserLogin />} /> 
        <Route path="/homePage" element={<HomePage />} />  
        <Route path="/articles" element={<Articles />} /> 
        <Route path="/signCard" element={<SignCard />} />  
        <Route path="/UserSignUp" element={<UserSignUp/>} />
        <Route path="/answers/:questionId" element={<AnswersPage/>} />
        <Route path='/docLogin' element={<DoctorLogin/>}/>
        <Route path="/:slug" element={<AnswersPage/>} />
        <Route path='/doctors/:doctorId' element={<DocParent/>}/> 
        <Route path='profile' element={<UserProfile/>}/> 
        <Route path='/edit-profile' element={<EditProfile/>}/> 
      </Routes>

    </Router>
    
  );
}

export default App;
