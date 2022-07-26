import {authAPI, RegisterRequestDataType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {AppThunk} from "../store";
import {handleServerNetworkError} from "../../utils/error-utils";

const REGISTER_NEW_USER = 'REGISTER-NEW-USER'

const initialState: initialStateType = {
   success: false
}

export const registrationReducer = (state: initialStateType = initialState, action: RegisterActionsType) => {
   switch (action.type) {
      case REGISTER_NEW_USER:
         return {
            ...state,
            success: action.success
         }
      default:
         return state
   }
}

//AC
export const registerNewUserAC = (success: boolean) => {
   return {type: REGISTER_NEW_USER, success} as const
}

//thunk
export const registerUserTC = (data: RegisterRequestDataType):AppThunk => (dispatch) => {
   authAPI.register(data)
      .then((res) => {
         dispatch(registerNewUserAC(true))
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}

//type
type initialStateType = {
   success: boolean
}

type registerNewUserACType = ReturnType<typeof registerNewUserAC>

export type RegisterActionsType = registerNewUserACType