import React, {useState} from 'react';
import CustomButton from '../CustomButton/CustomButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupButton = ({
        title,
        isPopupOpen = true,
        header,
        onPopup = () => {},
        outline = '',
        variant = 'bg-primary',
        border = 'border border-primary rounded',
        shadow = 'shadow-lg shadow-brown',
        hover = 'hover:bg-primary/70',
        className: customClass,
        cancelTitle = 'Hủy',
        cancelClassName = "close absolute left-2 bottom-2 text-black bg-light pt-1 pb-1 pl-5 pr-5 border border-light rounded hover:bg-gray-100",
        triggerComponent: TriggerComponent,
        children
    }) => {
    const [isOpen, setOpen] = useState(false);
    
    const classes = classNames('button', variant, outline, border, shadow, hover, customClass); 

    const contentStyle = {
        width: '60%',
        height: '85%',
        padding: '10px 5px',
        backgroundColor: '#1F1D2B'
    };

    const triggerButton = (
        <CustomButton className={classes} title={title} onAction={() => { onPopup(); setOpen(true); }} />
    );
    
    return (
        <Popup 
            open={isOpen && isPopupOpen}
            onClose={()=>setOpen(false)}
            trigger={TriggerComponent || triggerButton}
            modal
            contentStyle={contentStyle}
        >
            <div className="custom-popup-container">
                <div className="custom-popup-content">
                    <div className="custom-popup-header text-xl mt-2 mb-4 ml-3">{header}</div>
                    <div className="custom-popup-data ml-3 space-y-2">
                    {children}
                    </div>
                    <button className={cancelClassName}
                        onClick={() => {setOpen(false);}}>
                        {cancelTitle}
                    </button>
                </div>
            </div>
        </Popup>
    );
};
  
PopupButton.propTypes = {
    title: PropTypes.string,
    header: PropTypes.string,
    outline: PropTypes.bool,
    variant: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.object,
    onPopup: PropTypes.func,
    isOpen: PropTypes.bool,
    cancelTitle: PropTypes.string,
    cancelClassName: PropTypes.string,
    triggerComponent: PropTypes.elementType,
};

export default PopupButton;