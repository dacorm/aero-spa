import React, {ChangeEvent, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {IFilter} from "../models/models";
import {airportSlice} from "../store/slices/airportSlice";

export function AirportFilter() {
    const dispatch = useAppDispatch()
    const {regions, countries, types, loading} = useAppSelector(state => state.handbook)
    const [hasFilter, setHasFilter] = useState(false);
    const [filter, setFilter] = useState<IFilter>({
        type: '',
        country: '',
        region: '',
    })

    const isFilterEnabled = () => {
        return filter.type || filter.region || filter.country
    }

    useEffect(() => {
        if (isFilterEnabled()) {
            setHasFilter(true)
        } else {
            setHasFilter(false)
        }

        dispatch(airportSlice.actions.filter(filter))
    }, [filter])

    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const clearFilter = () => {
        setFilter({
            type: '',
            country: '',
            region: '',
        })
    }

    if (loading) return <p className='text-center'>Loading...</p>

    return (
        <div className='border py-2 px-4 mb-2'>
            <span className='font-bold mr-2'>Filter</span>

            <select name='type' className='mr-2 border py-1 px-2' defaultValue='' onChange={changeHandler}>
                <option value='' disabled>Type</option>
                {types.map(t => <option key={t}>{t}</option>)}
            </select>

            <select name='country' className='mr-2 border py-1 px-2' defaultValue='' onChange={changeHandler}>
                <option value='' disabled>Country</option>
                {countries.map(c => <option key={c}>{c}</option>)}
            </select>

            <select name='region' className='mr-2 border py-1 px-2' defaultValue='' onChange={changeHandler}>
                <option value='' disabled>Region</option>
                {regions.map(r => <option key={r}>{r}</option>)}
            </select>

            {hasFilter && <button className='py-1 px-4 bg-red-700 text-white' onClick={clearFilter}>&times;</button>}
        </div>
    )
}