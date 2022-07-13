import {combineReducers, configureStore} from "@reduxjs/toolkit";
import airportReducer from './slices/airportSlice'

const rootReducer = combineReducers({
    airport: airportReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]