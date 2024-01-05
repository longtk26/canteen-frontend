import * as React from 'react';
import { Box, Breadcrumbs, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BreadCrumbs = ({
    titles,
    textColor = 'text-white',
    hover = 'hover:text-primary hover:underline',
    className: customClass 
}) => {
    const classes = classNames('link', textColor, hover, customClass); 
    function handleClick(event) {
        event.preventDefault();
    };
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                {titles.map((title, index) => (
                    <Link
                        key={index}
                        href="#"
                        onClick={handleClick}>
                        <span className={classes}>{title}</span>
                    </Link>
                ))}
            </Breadcrumbs>
        </div>
    );
};

BreadCrumbs.propTypes = {
titles: PropTypes.string.isRequired
};

export default BreadCrumbs;