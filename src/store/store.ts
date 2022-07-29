import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RegisterActionsType, registrationReducer} from "./reducers/registration-reducer";
import {loginReducers} from "./reducers/login-reducers";
import {appReducer} from "../app/app-reducer";
import {profileReducers} from "./reducers/profile-reducers";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
   registration: registrationReducer,
   login: loginReducers,
   app: appReducer,
   profile: profileReducers,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//type
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppRootActionsType = RegisterActionsType


//
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<DispatchType>()