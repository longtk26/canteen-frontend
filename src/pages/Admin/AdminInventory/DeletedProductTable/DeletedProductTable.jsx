import * as React from 'react';
import InventoryApi from "../../../../api/inventoryApi";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Searchbar from '../../../../components/SearchBar/SearchBar';

function EnhancedTableHead(props) {
  const { headCells } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{fontWeight: 600, fontSize: '18px', paddingTop: '1rem', paddingBottom: '1rem'}}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object)
};

function EnhancedTableToolbar(props) {
  const { title, handleSearchBar } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: 'background.secondary'
      }}
    >
      {(
        <>
        <Typography
          sx={{ flex: '1 1 100%', color: '#EA7C69', fontWeight: 'fontWeight.tableTitle', fontSize: 'fontSize.tableTitle' }}
          variant="h1"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        <div className='p-3'>
          <Searchbar
            handleSearch={handleSearchBar}  
            placeholder='Tìm kiếm sản phẩm...'
          />
        </div>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default function DeletedProductTable(props) {
    const {headCells, title} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [originalRows, setOriginalRows] = React.useState([]);

    React.useEffect(() =>{
      const fetchExpiredProducts = async () => {
          const url = `https://reqres.in/api/users`;
          try {
              // const res = await axios.get(url);
              // const data = res.data;
              const data = [
                {
                    id: '1223',
                    name: 'Táo',
                    image: 'https://waapple.org/wp-content/uploads/2021/06/Variety_Granny-Smith-transparent-658x677.png',
                    cost: 8000,
                    price: 10000,
                    quantity: 200,
                    expirationDate: '2023-12-29'
                },
                {
                    id: '1224',
                    name: 'Coca',
                    image: 'https://thegioidouong.net/wp-content/uploads/2021/06/coca-300ml-chai-nhua.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                },
                {
                    id: '1225',
                    name: 'Oreo',
                    image: 'https://cooponline.vn/wp-content/uploads/2020/04/banh-quy-socola-oreo-socola-119-6g-20220927.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                },
                {
                    id: '1226',
                    name: 'Táo',
                    image: 'https://waapple.org/wp-content/uploads/2021/06/Variety_Granny-Smith-transparent-658x677.png',
                    cost: 8000,
                    price: 10000,
                    quantity: 200,
                    expirationDate: '2023-12-29'
                },
                {
                    id: '1227',
                    name: 'Coca',
                    image: 'https://thegioidouong.net/wp-content/uploads/2021/06/coca-300ml-chai-nhua.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                },
                {
                    id: '1228',
                    name: 'Oreo',
                    image: 'https://cooponline.vn/wp-content/uploads/2020/04/banh-quy-socola-oreo-socola-119-6g-20220927.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                },
                {
                    id: '1229',
                    name: 'Táo',
                    image: 'https://waapple.org/wp-content/uploads/2021/06/Variety_Granny-Smith-transparent-658x677.png',
                    cost: 8000,
                    price: 10000,
                    quantity: 200,
                    expirationDate: '2023-12-29'
                },
                {
                    id: '1230',
                    name: 'Coca',
                    image: 'https://thegioidouong.net/wp-content/uploads/2021/06/coca-300ml-chai-nhua.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                },
                {
                    id: '1231',
                    name: 'Oreo',
                    image: 'https://cooponline.vn/wp-content/uploads/2020/04/banh-quy-socola-oreo-socola-119-6g-20220927.jpg',
                    cost: 10000,
                    price: 15000,
                    quantity: 150,
                    expirationDate: '2024-01-01'
                }
            ];
              setRows(data);
              setOriginalRows(data);
          } catch (error) {
          console.error('Error fetching expired products:', error);
          }
      }
      fetchExpiredProducts()
    }, []);

    const handleSearchBar = async (query) => {
      console.log(query);
      if (originalRows.length > 0) {
          if (query !== ""){
              const searchResult = originalRows.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
              setRows(searchResult);
          }
          else{
          setRows(originalRows);
          }
      }
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    //console.log(emptyRows);
    return (
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar title={title} handleSearchBar={handleSearchBar}/>
            <TableContainer>
            <Table
                sx={{ minWidth: 750, bgcolor: 'background.secondary' }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead headCells={headCells} />
                <TableBody>
                {visibleRows.map((row, index) => {
                    return (
                    <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                    >
                        <TableCell padding="checkbox"></TableCell>
                        {headCells.map((cell, index) => (
                            <TableCell
                                key={cell.id}
                                scope="row"
                                padding='none'
                                sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                            >
                            {row[cell.id]}
                            </TableCell>
                        ))}
                    </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{bgcolor: 'background.secondary', color: 'text.white'}}
            />
        </Paper>
        </Box>
    );
}
