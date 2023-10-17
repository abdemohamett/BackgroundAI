import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
  return (
<div className="flex flex-col ">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <h1
         className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
            BackgroundAI
        </h1>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>
      </nav>

    </div>
  )
}

export default Navbar