import {authAPI, RegisterRequestDataType} from "../../api/cards-api";
import {Dispatch} from "redux";

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
export const registerUserTC = (data: RegisterRequestDataType) => (dispath: Dispatch<RegisterActionsType>) => {
   authAPI.register(data)
      .then((res) => {
         dispath(registerNewUserAC(true))
      })
      .catch((error) => {

      })
}

//type
type initialStateType = {
   success: boolean
}

type registerNewUserACType = ReturnType<typeof registerNewUserAC>

export type RegisterActionsType = registerNewUserACType