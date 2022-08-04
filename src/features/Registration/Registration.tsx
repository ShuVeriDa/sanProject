import classes from './Registration.module.css'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {registerUserTC} from "../../store/reducers/registration-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {useState} from "react";
import {useFormik} from "formik";
import {PATH} from "../../app/App";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
   email?: string
   password?: string
   passwordConfirm?: string
}

export const Registration = () => {
   const success = useAppSelector(state => state.registration.success)
   const dispatch = useAppDispatch()

   const [isValid, setIsValid] = useState<boolean>(false)
   const [passwordShown, setPasswordShown] = useState<boolean>(false);

   const togglePassword = () => {
      setPasswordShown(!passwordShown);
   };

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         passwordConfirm: '',
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

         if (!values.passwordConfirm) {
            setIsValid(false)
            errors.passwordConfirm = 'You need to write a confirm password'
         } else if (values.passwordConfirm !== values.password) {
            setIsValid(false)
            errors.passwordConfirm = "Passwords don't match!"
         }

         if (!errors.email && !errors.passwordConfirm && !errors.password) {
            setIsValid(true)
         } else {
            setIsValid(false)
         }

         return errors
      },

      onSubmit: values => {
         dispatch(registerUserTC(values))
         formik.resetForm()
      },
   })

   if (success) {
      return <Navigate to={PATH.LOGIN}/>
   }

   return (
      <div className={classes.regWrapper}>
         <div className={classes.reg}>
            <form onSubmit={formik.handleSubmit}>
               <h1 className={classes.title}>Sign Up</h1>
               <div>
                  <TextField label="Email"
                             error={!!formik.errors.email}
                             size='small'
                             margin='dense'
                             fullWidth
                             variant='standard'
                             helperText={formik.errors.email}
                             {...formik.getFieldProps('email')}
                  />
                  <TextField label="Password"
                             error={!!formik.errors.password}
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
                  <TextField label="Confirm password"
                             error={!!formik.errors.passwordConfirm}
                             helperText={formik.errors.passwordConfirm}
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
                             {...formik.getFieldProps('passwordConfirm')}
                  />
               </div>
               <div style={{margin: '60px 0 31px 0'}}>
                  <Button fullWidth
                          variant='contained'
                          type={"submit"}
                          disabled={!isValid}
                          className={classes.btn}
                  >
                     Sign Up
                  </Button>
               </div>
            </form>
            <div className={classes.signIn}>
               <span className={classes.info}>Don't have an account?</span>
               <NavLink to={PATH.LOGIN} className={classes.signInLink}>
                  Sign In
               </NavLink>
            </div>
         </div>

      </div>
   );
};
