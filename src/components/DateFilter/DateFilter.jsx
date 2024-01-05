import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';

//Day and month filter

const DateFilter = (isMonth, getDayOrMonth, resetFilter) => {
    const [dayOrMonth, setDayOrMonth] = useState('');

    const handleDayOrMonthChange = (event) => {
        setDayOrMonth(event.target.value);
    };

    const handleFilter = () => {
        getDayOrMonth(dayOrMonth);
    }

    const handleResetFilter = () => {
        setDayOrMonth("");
        resetFilter(dayOrMonth);
    }

    return (
        <div className='flex gap-2 bg-dark-line'>
            <div className='flex flex-col'>
                <label htmlFor='from'>From</label>
                <input
                    value={dayOrMonth}
                    onChange={handleDayOrMonthChange}
                    placeholder={isMonth ? 'Chọn tháng...' : 'Chọn ngày'}
                    className='p-2 mb-3 text-light bg-dark-line border-2 border-form rounded-md'
                    type={isMonth ? "month" : "date"}
                />
            </div>

            <div className='flex items-center'>
                <CustomButton 
                    title="Lọc"
                    onAction={handleFilter}
                    className="h-[50%] px-10 -mb-3"
                />
            </div>

            <div className='flex items-center'>
                <CustomButton 
                    title="Làm mới"
                    variant='delete'
                    onAction={handleResetFilter}
                    className="h-[50%] px-5 -mb-3"
                />
            </div>
        </div>
    );
}

export default DateFilter