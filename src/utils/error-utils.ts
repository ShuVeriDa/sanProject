import {AppRootActionsType} from "../store/store";
import {Dispatch} from "redux";
import {setAppError} from "../app/app-reducer";

export const handleServerNetworkError = (error:any, dispatch: Dispatch<AppRootActionsType>) => {
   dispatch(setAppError(error.response.data.error? error.response.data.error : 'Some error occurred'))

}