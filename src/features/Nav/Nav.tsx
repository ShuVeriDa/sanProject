import {NavLink} from "react-router-dom";
import classes from './Nav.module.css'

export const Nav = () => {
   const activeLink = (params: any) => params.isActive ? classes.active : classes.navLink
   return (
      <div className={classes.nav}>
         <NavLink to={'/login'} className={activeLink}>Login</NavLink> <br/>
         <NavLink to={'/profile'} className={activeLink}>Profile</NavLink> <br/>
         <NavLink to={'/registration'} className={activeLink}>Registration</NavLink> <br/>
         <NavLink to={'/newpass'} className={activeLink}>EnterNewPass</NavLink> <br/>
         <NavLink to={'/passrecovery'} className={activeLink}>PassRecovery</NavLink> <br/>
         <NavLink to={'/testshowcomp'} className={activeLink}>TestShowComponent</NavLink> <br/>
      </div>
   );
};