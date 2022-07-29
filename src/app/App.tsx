import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {Registration} from "../features/Registration/Registration";
import {EnterNewPass} from "../features/EnterNewPass/EnterNewPass";
import {PassRecovery} from "../features/PassRecovery/PassRecovery";
import {TestShowComponent} from "../features/TestShowComponent/TestShowComponent";
import {Nav} from "../features/Nav/Nav";

export enum PATH {
   LOGIN = '/login',
   REGISTRATION = '/registration',
   PROFILE = '/profile',
   NEW_PASSWORD = '/new_password',
   FORGOT = '/forgot-password',
   EXAMPLE = '/example',
   NOT_FOUND = '/404',
}

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='profile' element={<Profile />} />
        <Route path='registration' element={<Registration />} />
        <Route path='newpass' element={<EnterNewPass />} />
        <Route path='passrecovery' element={<PassRecovery />} />
        <Route path='testshowcomp' element={<TestShowComponent />}/>
        <Route path='404' element={<h1 style={{display: "flex", justifyContent: 'center'}}>404: PAGE NOT FOUND</h1>} />
        <Route path='*' element={<Navigate to={'404'} />} />
      </Routes>
    </div>
  );
}

export default App;
