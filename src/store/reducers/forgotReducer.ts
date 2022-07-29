import {Dispatch} from "redux";
import {authAPI, ForgotPassRequestDataType} from "../../api/cards-api";
import {handleServerNetworkError} from "../../utils/error-utils";

const FORGOT_PASSWORD = 'FORGOT-PASSWORD'

const initialState = {}

export const forgotReducer = (state: InitialStateType = initialState, action: ActionsType) => {
   switch (action.type) {
      case FORGOT_PASSWORD:
         return {
            ...state,
            data: action.data
         }
      default:
         return state
   }
}

// actions
const forgotPasswordAC = (data: ForgotPassRequestDataType) =>
   ({type: FORGOT_PASSWORD, data} as const)


// thunks
export const forgotPasswordTC = (data: ForgotPassRequestDataType) => (dispatch: Dispatch<ForgotPasswordAC>) => {
   authAPI.forgotPassword(data)
      .then(res => {
         dispatch(forgotPasswordAC(data))
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch)
   })
}

// types
export type InitialStateType = typeof initialState

type ForgotPasswordAC = ReturnType<typeof forgotPasswordAC>
type ActionsType = ForgotPasswordAC