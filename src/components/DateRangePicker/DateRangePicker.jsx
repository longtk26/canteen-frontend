import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';

const DateRangePicker = ({getDateRange, resetFilter}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilter = () => {
    const dateRange = {
        start: startDate,
        end: endDate,
    };
    getDateRange(dateRange);
  }

  const handleResetFilter = () => {
    const dateRange = {
        start: "",
        end: "",
    };
    setStartDate("");
    setEndDate("");
    resetFilter(dateRange);
  }

  return (
    <div className='flex gap-2 bg-dark-line'>
        <div className='flex flex-col'>
            <label htmlFor='from'>From</label>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
                max={endDate}
                className='p-2 mb-3 text-light bg-dark-line border-2 border-form rounded-md'
                id='from'
            />
        </div>
        
        <div className='flex flex-col'>
            <label htmlFor='to'>To</label>
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
                min={startDate} 
                className='p-2 mb-3 text-light bg-dark-line border-2 border-form rounded-md'
                id='to'
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
};

export default DateRangePicker;