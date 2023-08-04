import React from 'react'
import EventNavigation from '../components/EventNavigation'
import { Outlet } from 'react-router'

export default function EventsRoot() {
  return (
    <div>
        <EventNavigation/>
        <Outlet/>
    </div>
  )
}
