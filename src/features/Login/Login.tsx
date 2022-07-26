import classes from './Login.module.css'
import {useAppDispatch, useAppSelector,} from "../../store/store";
import {Navigate, NavLink,} from "react-router-dom";
import {useState} from "react";
import {useFormik} from "formik";
import {PATH} from "../../app/App";
import {Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {loginTC} from "../../store/reducers/login-reducers";

type FormikErrorType = {
   email?: string
   password?: string
   rememberMe?: boolean
}

export const Login = () => {
   const dispatch = useAppDispatch()
   const isLoggedId = useAppSelector(state => state.login.isLoggedIn)

   const [isValid, setIsValid] = useState<boolean>(false)
   const [passwordShown, setPasswordShown] = useState<boolean>(false);

   const togglePassword = () => {
      setPasswordShown(!passwordShown);
   };

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      validate: (values) => {
         const errors: FormikErrorType = {};
         if (!values.email) {
            errors.email = 'You need to write an email';
            setIsValid(false)
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setIsValid(false)
            errors.email = 'Invalid email address';
         }

         if (!values.password) {
            setIsValid(false)
            errors.password = 'You need to write a password'
         } else if (values.password.length < 8) {
            setIsValid(false)
            errors.password = 'Password must be more than 8 characters'
         }

         if (!errors.email && !errors.password) {
            setIsValid(true)
         } else {
            setIsValid(false)
         }

         return errors
      },

      onSubmit: values => {
         dispatch(loginTC(values))
      },
   })

   if (isLoggedId) {
      return <Navigate to={PATH.PROFILE}/>
   }

   return (
      <div className={classes.loginWrapper}>
         <div className={classes.login}>
            <form onSubmit={formik.handleSubmit}>
               <h1 className={classes.title}>Sign In</h1>
               <div>
                  <TextField label="Email"
                             error={!!formik.errors.email && !!formik.touched.email}
                             size='small'
                             margin='dense'
                             fullWidth
                             variant='standard'
                             helperText={formik.errors.email}
                             {...formik.getFieldProps('email')}
                  />
                  <TextField label="Password"
                             error={!!formik.errors.password && !!formik.touched.password}
                             helperText={formik.errors.password}
                             type={passwordShown ? 'text' : 'password'}
                             size="small"
                             margin='dense'
                             fullWidth
                             variant='standard'
                             InputProps={{
                                endAdornment: (
                                   <InputAdornment position="end">
                                      <IconButton
                                         onClick={togglePassword}
                                      >
                                         {passwordShown ? <Visibility/> : <VisibilityOff/>}
                                      </IconButton>
                                   </InputAdornment>
                                )
                             }}
                             {...formik.getFieldProps('password')}
                  />
                  <FormControlLabel label={'Remember me'} control={<Checkbox {...formik.getFieldProps('rememberMe')}/>} />
                  <div className={classes.loginForgot}>
                     <NavLink to={PATH.FORGOT}>
                        Forgot Password?
                     </NavLink>
                  </div>

               </div>
               <div style={{margin: '60px 0 31px 0'}}>
                  <Button fullWidth
                          variant='contained'
                          type={"submit"}
                          disabled={!isValid}
                          className={classes.btn}
                  >
                     Sign In
                  </Button>
               </div>
            </form>
            <div className={classes.signIn}>
               <span className={classes.info}>Already have an account?</span>
               <NavLink to={PATH.REGISTRATION} className={classes.signInLink}>
                  Sign Up
               </NavLink>
            </div>
         </div>

      </div>
   );
};
