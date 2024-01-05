import PropTypes from 'prop-types';
import Row from "./Row/Row";
import Column from "./Column/Column";
import Filter from "../Filter/Filter";

const Table = ({ title, column, rows, hasFilter = false, filterItems=[] }) => {
  return (
    <div className="bg-dark-bg-2 text-white border border-dark-bg-2 rounded-md">
      <div className="flex justify-between">
        <h1 className="ms-4 my-2 text-2xl font-semibold text-primary flex items-center">{title}</h1>
        {/* Conditionally render Filter component */}
        {hasFilter && filterItems!=[] && <div className="p-4"><Filter filterItems={filterItems}/></div>}
      </div>
      {/* Handle overflow scrolling */}
      <div className="row-container max-h-80 overflow-y-auto"> 
        <table className="table-auto w-full">
          <thead>
            <Column column={column}/>
          </thead>
          <tbody>
            {
              rows.map((row, index) => (
                <Row key={index} row={row}/>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  column: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default Table;
