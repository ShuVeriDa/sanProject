import React from 'react';
import './App.module.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {Registration} from "../features/Registration/Registration";
import {EnterNewPass} from "../features/EnterNewPass/EnterNewPass";
import {TestShowComponent} from "../features/TestShowComponent/TestShowComponent";
import {Nav} from "../features/Nav/Nav";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {Header} from "../features/Header/Header";
import classes from './App.module.css'
import {ForgotPassword} from "../features/ForgotPassword/ForgotPassword";

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
    <div className={classes.App}>
       <Header />
      <div className={classes.wrapper}>
         <Routes>
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<Profile />} />
            <Route path='registration' element={<Registration />} />
            <Route path='newpass' element={<EnterNewPass />} />
            <Route path='forgotPass' element={<ForgotPassword />} />
            <Route path='testshowcomp' element={<TestShowComponent />}/>
            <Route path='404' element={<h1 style={{display: "flex", justifyContent: 'center'}}>404: PAGE NOT FOUND</h1>} />
            <Route path='*' element={<Navigate to={'404'} />} />
         </Routes>
      </div>

       <Nav />

       <ErrorSnackbar/>
    </div>
  );
}

export default App;
