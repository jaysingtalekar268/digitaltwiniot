import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Temperature from "../temparature/temparature";
import { Link } from "react-router-dom";
import './navbar.css'
function Navbar_main() {

    return (
        <nav >
            <ul >
            <li  className="navbar_li"><Link className="NavbarLink"  to="/" > Home </Link></li>
           
                <li className="navbar_li" ><Link className="NavbarLink"  to="/Temperature" > Temperature </Link></li>
                <li className="navbar_li" ><Link className="NavbarLink"  to="/Humidity" > Humidity </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar_main;