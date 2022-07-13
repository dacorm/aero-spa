import {IAirport, IFilter} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportState {
    loading: boolean
    error: string
    count: number
    airports: IAirport[]
    airportsContainer: IAirport[]
}

const initialState: AirportState = {
    loading: false,
    count: 0,
    error: '',
    airports: [],
    airportsContainer: []
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
            state.airportsContainer = action.payload.airports
            state.count = action.payload.count
            state.error = ''

        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        },
        filter(state, action: PayloadAction<IFilter>) {
            state.airports = state.airportsContainer.filter(a => a.type.includes(action.payload.type))
                .filter(a => a.country.includes(action.payload.country))
                .filter(a => a.region.includes(action.payload.region))
        }
    }
})

export default airportSlice.reducer