import React from 'react';
import PropTypes from 'prop-types';
import {SearchIcon} from '../../assets/svgs';

const Searchbar = ({handleSearch, placeholder = "Search..."}) => {
    const [keyword, setKeyword] = React.useState("");

    const handleInputChange = (event) => {
        const input = event.target.value;
        setKeyword(input);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch(keyword);
        }
    };

    return (
        <div className='flex border-2 me-3'>
            <div className='flex justify-center items-center p-1 bg-dark-line'>
                <SearchIcon className="w-[20px] h-[20px] "/>
            </div>
            <input
                className='p-1 bg-dark-line outline-none  text-white'
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                aria-label="Search field"
            />
        </div>
    );
};

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}
export default Searchbar;