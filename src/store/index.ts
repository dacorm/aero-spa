import {combineReducers, configureStore} from "@reduxjs/toolkit";
import airportReducer from './slices/airportSlice'
import handbookReducer from './slices/handbookSlice'
import authReducer from './slices/authSlice'

const rootReducer = combineReducers({
    airport: airportReducer,
    handbook: handbookReducer,
    auth: authReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]