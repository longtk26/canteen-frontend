const CurrentDate = () => {
    const currentDate = new Date();
  
    // Define day names and month names for formatting
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Get day, month, and year
    const dayOfWeek = dayNames[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
  
    return (
      <div className="font-barlow text-base text-light">
        {`${dayOfWeek}, ${dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth}, ${month}, ${year}`}
      </div>
    );
  };
  
  export default CurrentDate;