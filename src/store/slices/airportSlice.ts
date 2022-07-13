import {IAirport} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportState {
    loading: boolean
    error: string
    count: number
    airports: IAirport[]
}

const initialState: AirportState = {
    loading: false,
    count: 0,
    error: '',
    airports: []
}

interface IAirportPayload {
    airports: IAirport[]
    count: number
}

export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<IAirportPayload>) {
            state.loading = false
            state.airports = action.payload.airports
            state.count = action.payload.count
            state.error = ''

        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default airportSlice.reducer