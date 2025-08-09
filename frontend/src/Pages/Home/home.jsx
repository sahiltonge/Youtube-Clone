import React from 'react'
import './home.css'
import HomePage from '../../Components/HomePage/HomePage';
import SideNavbar from '../../Components/Side-Navbar/SideNavbar';

function Home({sideNavbar}) {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar}/>
      <HomePage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Home;
