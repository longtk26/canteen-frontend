import React from 'react'
import {Button} from '@mui/material';

export default function ActionButton(props) {

    const {sx, children, onClick } = props;

    return (
        <Button
            sx={sx}
            onClick={onClick}
            variant="contained"
        >
            {children}
        </Button>
    )
}