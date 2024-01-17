
'use client';

import { Navbar } from 'flowbite-react';
import "./Nav.css"

const Nav = () => {
  return (
    <Navbar className='border-2 border-b' fluid rounded>
      <Navbar.Brand href="#"> 
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pinoy PERS</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#">
          Profile
        </Navbar.Link>
        <Navbar.Link href="#">
          Log Out
        </Navbar.Link> 
      </Navbar.Collapse>
    </Navbar>
  );
}


export default Nav;