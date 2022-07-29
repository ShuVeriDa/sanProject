import {authAPI, LoginRequestDataType} from "../../api/cards-api";
import {AppThunk} from "../store";
import {handleServerNetworkError} from "../../utils/error-utils";

const AUTH_SET_AUTH_STATUS = '"AUTH/SET-AUTH-STATUS"'

const initialState: initialStateType = {
   isLoggedIn: false
}

export const loginReducers = (state: initialStateType = initialState, action: LoginActionsType) => {
   switch (action.type) {
      case AUTH_SET_AUTH_STATUS:
         return {...state, isLoggedIn: action.isLoggedIn}
   }
}

//AC
const setIsLoggedInAC = (isLoggedIn: boolean) =>
   ({type: AUTH_SET_AUTH_STATUS, isLoggedIn} as const)

//thunk
export const loginTC = (data: LoginRequestDataType):AppThunk => (dispatch) => {
   authAPI.login(data)
      .then(res => {
         setIsLoggedInAC(true)
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch)
      })
}

//type
type initialStateType = {
   isLoggedIn: boolean
}

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type LoginActionsType = SetIsLoggedInACType