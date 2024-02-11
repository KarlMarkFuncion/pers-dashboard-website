import { Navbar } from 'flowbite-react';
import "./Nav.css"
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar className="border-2 border-b h-fit" fluid>
      <Navbar.Brand>
        <Link to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pinoy PERS</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
          {/* <Link to="/profile">Profile</Link>  */}
        <Navbar.Link>
          {/* <Link to="/">Log Out</Link> */}
        </Navbar.Link>  
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
