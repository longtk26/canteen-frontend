import PropTypes from "prop-types";

const Column = ({column}) => {
    return (
        <tr>
            {column.map((columnCell, index) => {
              return (
                <th key={index} className="px-4 py-1 text-left">{columnCell}</th>
              );
            })}
        </tr>
    )
}

Column.propTypes = {
    column: PropTypes.arrayOf(PropTypes.string)
}

export default Column;