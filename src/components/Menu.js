import React, { useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const [login, setLogin] = useState(false)

    useEffect(() => {
        fetch('/api/checkCookie')
        .then(res => {
            console.log(res)
            if(login !== res.status){
                if(res.status === 200) setLogin(true)
                else setLogin(false)
            }
        })
    })

    return (
        <Router>
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/" >Teamate</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><a style={{color: "white"}}>Home</a></Nav.Link>
                    {login === true ? <Nav.Link href="/items"><a style={{color: "white"}}>Items</a></Nav.Link> : null }
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {login === true ? <Nav.Link href="/signout" ><a style={{color: "white"}}>Logout</a></Nav.Link> : <Nav.Link href="/signin"><a style={{color: "white"}}>Sign in</a></Nav.Link>}
                {login === false ? <Nav.Link href="/signup"><a style={{color: "white"}}>Sign up</a></Nav.Link> : null}
            </Navbar.Collapse>
            </Navbar>
        </Router>
    )
}

export default Menu
