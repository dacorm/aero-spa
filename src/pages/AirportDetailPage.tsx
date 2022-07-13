import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "../axios/index";
import {IAirportDetail} from "../models/models";

export function AirportDetailPage() {
    const params = useParams<'id'>()
    const [airport, setAirport] = useState<IAirportDetail | null>(null)
    const [loading, setLoading] = useState(true)

    async function fetchDetailAirport() {
        const res = await axios.get<IAirportDetail>(`/airports/${params.id}`)
        setAirport(res.data)
        setLoading(false)
    }


    useEffect(() => {
        fetchDetailAirport()
    }, [])

    if (loading) return <p className='text-center'>Loading...</p>

    return (
        <div className='container mx-auto pt-5 max-w-[760px]'>
        <h1 className='text-center text-2xl'>{airport?.name}</h1>
            <p>Airport coordinates - {airport?.coordinates}</p>
            <p>Airport country - {airport?.country}</p>
            <p>Airport region - {airport?.region}</p>
        </div>
    )
}