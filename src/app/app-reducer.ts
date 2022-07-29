import {AppThunk} from "../store/store";
import {authAPI} from "../api/cards-api";
import {handleServerNetworkError} from "../utils/error-utils";

const APP_SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED'
const APP_SET_ERROR = 'APP/SET-ERROR'

const initialState: initialStateType = {
   isInitialized: false,
   error: null as string | null
}

export const appReducer = (state: initialStateType = initialState, action: AppReducerActionsType) => {
   switch (action.type) {
      case APP_SET_IS_INITIALIZED:
         return {...state, isInitialized: action.value}
      case APP_SET_ERROR:
         return {...state, error: action.error}
      default:
         return state
   }
}

//AC
export const setAppInitializedAC = (value: boolean) =>
   ({type: APP_SET_IS_INITIALIZED, value} as const)

export const setAppError = (error: string | null) =>
   ({type: APP_SET_ERROR, error} as const)

//THUNK
export const initializeAppTC = (): AppThunk => (dispatch) => {
   authAPI.me()
      .then(res => {
         dispatch(setAppInitializedAC(true))
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch)
      })
}

//type
type initialStateType = {
   isInitialized: boolean,
   error: string | null
}

type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>
type SetAppErrorACType = ReturnType<typeof setAppError>

export type AppReducerActionsType = SetAppInitializedACType
| SetAppErrorACType