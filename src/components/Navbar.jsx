import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='nav '>
        <nav className='flex bg-slate-900 justify-between px-8 py-6 h-20'>
            <div className="logo font-bold md:text-2xl text-lg ">
                <span className='text-green-500'></span>
                <span className='text-white'>Arty-</span>
                <span className='text-green-500'>Passwords</span>
                </div>
            <ul className='flex text-white gap-3'>
                <a href="#"><li>Home</li></a>
                <a href="#"><li>About</li></a>
                <a href="#"><li>Contact</li></a>

            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
