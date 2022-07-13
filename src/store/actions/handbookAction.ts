import {Dispatch} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AppDispatch} from "../index";
import {IAirport, IAirportCountry, IAirportRegion, IAirportType, ServerResponse} from "../../models/models";
import { airportSlice} from "../slices/airportSlice";
import { HandBookSlice } from "../slices/handbookSlice";


export const fetchHandBooks = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(HandBookSlice.actions.fetching())
            const res = await Promise.all([
                axios.get<IAirportType[]>('handbooks/airport-types'),
                axios.get<IAirportRegion[]>('handbooks/regions'),
                axios.get<IAirportCountry[]>('handbooks/countries')
            ])
            console.log(res)
            dispatch(HandBookSlice.actions.fetchSuccess({
                types: res[0].data,
                regions: res[1].data,
                countries: res[2].data,
            }))
        } catch (e) {
            dispatch(HandBookSlice.actions.fetchError(e as Error))
        }
    }
}