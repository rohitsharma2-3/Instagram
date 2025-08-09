import React from 'react'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'

const MainPage = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <RightSidebar />
    </div>
  )
}

export default MainPage