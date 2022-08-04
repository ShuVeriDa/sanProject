import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RegisterActionsType, registrationReducer} from "./reducers/registration-reducer";
import {LoginActionsType, loginReducers} from "./reducers/login-reducers";
import {appReducer, AppReducerActionsType} from "../app/app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
   registration: registrationReducer,
   login: loginReducers,
   app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<DispatchType>()

//type
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppRootActionsType = RegisterActionsType
   | AppReducerActionsType
   | LoginActionsType
