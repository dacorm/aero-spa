import React, {useEffect, useState} from 'react'
import {useInput} from "../hook/input";
import {useDebounce} from "../hook/debounce";
import axios from "../axios";
import {IAirport, ServerResponse} from "../models/models";
import {useNavigate} from "react-router-dom";

export function AirportSearch() {
    const input = useInput('')
    const [airports, setAirports] = useState<IAirport[]>([])
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce<string>(input.value, 400)
    const navigate = useNavigate()

    async function searchAirports() {
        const res = await axios.get<ServerResponse<IAirport>>('airports', {
            params: {
                search: debounced,
                count: 10
            }
        })
        setAirports(res.data.results)
    }

    useEffect(() => {
        if (debounced.length > 3) {
            searchAirports().then(() => setDropdown(true))
        } else {
            setDropdown(false)
        }
    }, [debounced])

    return (
        <div className='mb-4 relative'>
            <input
            type='text'
            className='border py-2 py-4 mb-4 w-full h-[42px]'
            placeholder='Type something here'
            {...input}
            />

            {dropdown && <ul className='list-none absolute left-0 right-0 h-[200px] top-42 shadow-md bg-white overflow-y-scroll'>
                {
                    airports.map(airport => (
                        <li
                            className='py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-white'
                            key={airport.id}
                            onClick={() => navigate(`/airport/${airport.id}`)}
                        >
                            {airport.name}
                        </li>
                    ))
                }
            </ul>}
        </div>
    )
}