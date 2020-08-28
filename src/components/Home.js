import React from 'react'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: 'auto'}}>
            <p>
                <br />
                <h1 style={{color: "skyblue", fontSize: "80px"}}>Welcome! Homepage!</h1>
                <br />
                <Button variant="primary" size="sm"><a style={{fontSize:"15px"}}>Read More</a></Button>
            </p>
        </div>
    )
}
export default Home
