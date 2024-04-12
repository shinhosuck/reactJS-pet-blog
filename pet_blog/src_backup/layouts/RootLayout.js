import { Outlet } from 'react-router-dom'
import React from 'react'







function RootLayout() {
  return (
    <Outlet context={{message:'This is root layout'}}/>
  )
}

export default RootLayout