import React, { useState } from 'react'
import { Form, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Collection } from 'mongoose';

const SignIn = () => {
    const history = useHistory()

    const [ user, setUser ] = useState({
        email : "",
        password : ""
    })

    function handleInputChange(e) {
        e.preventDefault()
 
        const { value, name } = e.target

        setUser({
            ...user,
            [name] : value
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        fetch('/api/signin', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(res => {
            console.log(res)
            if(res.status === 200){
                history.push('/') 
            } else {
                const error = new Error(res.error)
                
                throw error
            }
        })
        .catch(err => {
            console.error(err)
            alert('Error loggin in please try again')
        })
    }

    return (
        <div  style={{display:'flex', justifyContent:'center', alignItems:'center', height:'auto'}}>

        <Form onSubmit={onSubmit}>
            <h1>Sign In</h1>

            <div class="container">
            <div class="row">
            <div class="col-xm-12">
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter Email" name="email" value={user.email} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleInputChange} required />
                </Form.Group>
            </div>
            </div>
            </div>
            <Button type="submit" size="md">Sign In</Button>
        </Form>

        </div>
    )
}

export default SignIn