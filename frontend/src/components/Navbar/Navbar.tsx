import { Button } from '@mui/material'
import React, { useState } from 'react'

export const Navbar = () => {
    const [login, setLogin] = useState(false)
    return (
        <nav>
            {!login ?
                <Button variant="contained" color="primary" onClick={() => setLogin(true)}>Login</Button> :
                <Button variant='outlined' color='primary' onClick={() => setLogin(false)}>Logout</Button>
            }
        </nav>
    )
}
