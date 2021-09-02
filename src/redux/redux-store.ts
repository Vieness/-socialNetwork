import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

});

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

/*type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>*/

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store
