import React from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const navStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#5cd2dc',
    color: "#fff !important"
}

const brandLogo =  {
    fontSize: "2rem",
    textDecoration: "none",
    color: "#fff !important"
}

// const linkDiv = {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     padding: '10px',
//     textDecoration: "none",

// }

// const linkStyle = { 
//     textDecoration: "none",
// }

function Header() {
    return ( <nav>
             <div style={navStyles}> 
                <Link to = "/" style={brandLogo}> IT Courses </Link>
{/*            
                <ul id = "nav-mobile" style = {linkDiv}>
                    <li> <Link to = "/shop"> Shop </Link></li>
                    <li> <Link to = "/about"> About </Link></li>
                </ul>     */}
           
             </div>
        </nav> );
}


export default Header;