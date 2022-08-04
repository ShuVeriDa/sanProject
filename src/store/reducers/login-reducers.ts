import {authAPI, LoginRequestDataType} from "../../api/cards-api";
import {AppThunk} from "../store";
import {handleServerNetworkError} from "../../utils/error-utils";

const AUTH_SET_AUTH_STATUS = '"AUTH/SET-AUTH-STATUS"'
const AUTH_SET_AUTH_ERROR = '"AUTH/SET-AUTH-ERROR"'

const initialState: initialStateType = {
   isLoggedIn: false
}

export const loginReducers = (state: initialStateType = initialState, action: LoginActionsType) => {
   switch (action.type) {
      case AUTH_SET_AUTH_STATUS:
         return {...state, isLoggedIn: action.isLoggedIn}
      case AUTH_SET_AUTH_ERROR:
         return {...state, error: action.error}
      default:
         return state
   }
}

//AC
const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: AUTH_SET_AUTH_STATUS, isLoggedIn} as const)
const setAuthErrorAC = (error: string) => ({type: AUTH_SET_AUTH_ERROR, error} as const)
//thunk
export const loginTC = (data: LoginRequestDataType):AppThunk => (dispatch) => {
   authAPI.login(data)
      .then(res => {
         dispatch(setIsLoggedInAC(true))
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch)
      })
      .catch(error => {
         dispatch(setAuthErrorAC(error.response.data.error))
      })
}

//type
type initialStateType = {
   isLoggedIn: boolean
}

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type SetAuthErrorACType = ReturnType<typeof setAuthErrorAC>
export type LoginActionsType = SetIsLoggedInACType | SetAuthErrorACType