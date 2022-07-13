import React, {useEffect, useRef, useState} from 'react'
import {AirportSearch} from "../components/AirportSearch";
import {AirportFilter} from "../components/AirportFilter";
import {AirportCard} from "../components/AirportCard";
import {useDispatch} from "react-redux";
import {fetchAirports} from "../store/actions/airportActions";
import {useAppDispatch, useAppSelector} from "../hook/redux";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 50;

export function MainPage() {
    const dispatch = useAppDispatch()
    const page = useRef(1);
    const {error, loading, airports, count} = useAppSelector(state => state.airport)

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE)



    const pageChangeHandler = ({selected}: {selected: number}) => {
        page.current = selected + 1
        dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
    }

    useEffect(() => {
        dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
    }, [dispatch])

    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
            <AirportSearch />

            <AirportFilter />

            { loading && <p className='text-center text-lg'>Loading...</p> }
            { error && <p className='text-center text-red-600 text-lg'>{error}</p> }

            {
                airports.map(airport => <AirportCard key={airport.id} airport={airport}/>)
            }

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={pageChangeHandler}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                forcePage={page.current - 1}
                previousLabel="<"
                containerClassName="flex"
                pageClassName="border py-1 px-3 mr-2"
                activeClassName="bg-gray-500 text-white"
                previousClassName="border py-1 px-3 mr-2"
                nextClassName="border py-1 px-3"
            />
        </div>
    )
}