import React from 'react'
import { useHistory } from "react-router-dom";

const sessionCheck = () => {
    const history = useHistory()
    
    fetch('/api/sessionCheck')
    .then(res =>{
        console.log(res)
        if(res.status === 200){
            history.push('/')
        }
    })

    return(
    <>
    </>
    )    
}

export default sessionCheck