import PropTypes from "prop-types";

const Row = ({row})=>{
    return (
        <tr className="border-t border-dark-bg-1">
          {row.map((cell, cellIndex) => (
            <td key={cellIndex} className="p-4">{cell}</td>
          ))}
        </tr>
    );
}

Row.propTypes = {
    row: PropTypes.arrayOf(PropTypes.string)
}

export default Row;