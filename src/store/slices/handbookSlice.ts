import {IAirport, IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HandBookState {
    loading: boolean
    types: IAirportType[]
    regions: IAirportRegion[]
    countries: IAirportCountry[]
}

const initialState: HandBookState = {
    loading: false,
    regions: [],
    countries: [],
    types: []
}

interface HandBookPayload {
    types: IAirportType[]
    countries: IAirportCountry[]
    regions: IAirportRegion[]
}

export const HandBookSlice = createSlice({
    name: 'HandBook',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<HandBookPayload>) {
            state.loading = false
            state.types = action.payload.types
            state.regions = action.payload.regions
            state.countries = action.payload.countries
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            // state.types = action.payload.message
        }
    }
})

export default HandBookSlice.reducer