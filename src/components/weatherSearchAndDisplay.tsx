"use client"
import React from 'react'
import SearchComponent from './searchComponent'
import WeatherCardComponent from './weatherCardComponent'

const WeatherSearchAndDisplay = () => {
    return (
        <div className="flex-grow grid md:grid-cols-2 md:my-5">
            <SearchComponent />
            <WeatherCardComponent />
        </div>
    )
}

export default WeatherSearchAndDisplay