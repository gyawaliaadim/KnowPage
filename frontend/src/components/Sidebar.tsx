import React from 'react'

const Sidebar = ({className}:{className:string}) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
    <>
    <h2>Know Page</h2>
    </>
    <div>
        Projects
    </div>
    </div>
  )
}

export default Sidebar