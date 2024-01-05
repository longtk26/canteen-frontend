import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import ActionButton from '../ActionButton/ActionButton';

const PopUp = (props) => {
    const {title, children, isOpen, handleCloseBtnClick} = props;
    return(
        <Dialog 
        open={isOpen} 
        maxWidth="lg" 
        sx={{position: 'absolute'}}>
            <DialogTitle sx={{backgroundColor: 'background.secondary'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="div" style={{ flexGrow: 1, marginRight: '24px', fontSize: '32px', fontWeight: 'bolder' }}>
                        {title}
                    </Typography>
                    <ActionButton
                        sx={{backgroundColor: 'background.secondary', boxShadow: 'none', px: '12px', minWidth: '0px', border: 'none'}}
                        onClick={handleCloseBtnClick}>
                        <CloseIcon />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers sx={{backgroundColor: 'background.secondary', display: 'flex', justifyContent: 'center'}}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp;