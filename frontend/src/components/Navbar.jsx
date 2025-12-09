import React from 'react'
import {assests} from '../assets/assests.js'

const Navbar = () => {
  return (
    <div>
        <div>
            <img src={assests.logo} alt="logo" className='w-32' />
        </div>
    </div>
  )
}

export default Navbar