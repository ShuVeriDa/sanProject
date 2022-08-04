import axios from "axios";

export const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/" || 'http://localhost:7542/2.0/',
   withCredentials: true,
})

export const authAPI = {
   register: (data: RegisterRequestDataType) => {
      return instance.post('auth/register', data)
   },
   login: (data: LoginRequestDataType) => {
      return instance.post('auth/login', data)
   },
   forgotPassword: (data: ForgotPassRequestDataType) => {
      return instance.post('/auth/forgot', data)
   },
   me: () => {
      return instance.post('auth/me')
   }
}

//type

export type RegisterRequestDataType = {
   email: string
   password: string
}

export type LoginRequestDataType = {
   email: string
   password: string
   rememberMe?: boolean
}

export type ForgotPassRequestDataType = {
   email: string
   from: string
   message: string
}