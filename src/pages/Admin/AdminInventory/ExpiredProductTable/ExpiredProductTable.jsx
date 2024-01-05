import * as React from 'react';
import InventoryApi from "../../../../api/inventoryApi";
import { useStaffInventoryContext } from '../../../../context/Staff/StaffInventoryContext';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import PopUp from '../../../../components/Popup/Popup';
import Searchbar from '../../../../components/SearchBar/SearchBar';
import { Loading } from '../../../../components';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{color: 'text.primary'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{fontWeight: 600, fontSize: '18px', paddingTop: '1rem', paddingBottom: '1rem'}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.object)
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete, title, handleSearchBar } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        bgcolor: 'background.secondary'
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
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

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{color: 'text.white', fontSize: 'fontSize.icon'}}/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default function ExpiredProductTable(props) {
    const {headCells, title} = props;

    //Use context
    const {
      expiredTableRows,
      expiredTableOriginalRows,
      setInventoryTableRows,
      setInventoryTableOriginalRows, 
      setExpiredTableRows, 
      setExpiredTableOriginalRows 
    } = useStaffInventoryContext();

    //States
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isLoading, setLoading] = React.useState(false);
    //Handle pop up
    const [openDeletePopUp, setOpenDeletePopUp] = React.useState(false);

    //Token and client id
    const token = localStorage.getItem('token');
    const clientId = localStorage.getItem('clientId');

    //Fetch data
    React.useEffect(() =>{
      const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await InventoryApi.getAllExpiredProduct({token, clientId});
            const data = res.data;
            setExpiredTableRows(data);
            setExpiredTableOriginalRows(data);
            setLoading(false);
        } catch (error) {
          console.error('Error fetching expired products:', error);
        }
      }
      fetchProducts()
    }, []);

    const handleSearchBar = async (query) => {
        console.log(query);
        if (expiredTableOriginalRows.length > 0) {
            if (query !== ""){
              const searchResult = expiredTableOriginalRows.filter((item) => item.inventoryItem_name.toLowerCase().includes(query.toLowerCase()));
              setExpiredTableRows(searchResult);
            }
            else{
              setExpiredTableRows(expiredTableOriginalRows);
            }
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = expiredTableRows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),);
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleOnDeleteIconClick = async () => {
      setOpenDeletePopUp(true);
    }
    
    const handleOnDelete = () => {
      console.log(selected); //Ex: ["3890945sfrf", "39eu289fjfd", "sfuisfw9333"]
      
      //Delete expired items from inventory
      const deleteProducts = async () => {
        try {
          setLoading(true);
          const body = {
            "userId": clientId,
            "item_list": selected.map((id) => {
              return {
                inventoryItem: id
              }
            })
          }
          const res = await InventoryApi.deleteInventoryItems({token, clientId}, body);
          const newData = await InventoryApi.getAllInventoryItems({token, clientId});

          //Update ExpiredProductTable
          const expiredProduct = await InventoryApi.getAllExpiredProduct({token, clientId});
          setExpiredTableRows(expiredProduct.data);
          setExpiredTableOriginalRows(expiredProduct.data);

          //Update InventoryTable
          setInventoryTableRows(newData.data);
          setInventoryTableOriginalRows(newData.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching expired products:', error);
        }
      }
      deleteProducts()
      setOpenDeletePopUp(false);
      setSelected([]);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expiredTableRows.length) : 0;

    const visibleRows = stableSort(expiredTableRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return (
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
              numSelected={selected.length} 
              handleDelete={handleOnDeleteIconClick} 
              title={title}
              handleSearchBar={handleSearchBar} />
            <TableContainer>
            <Table
                sx={{ minWidth: 750, bgcolor: 'background.secondary' }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={expiredTableRows.length}
                    headCells={headCells}
                />
                <TableBody>
                {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                            sx={{color: 'text.white'}}
                        />
                        </TableCell>
                        
                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              row._id
                            }
                        </TableCell>

                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              <img src={row.inventoryItem_img} className='h-[60px] w-[60px] flex-none bg-gray-50'></img>
                            }
                        </TableCell>

                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              row.inventoryItem_name
                            }
                        </TableCell>

                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              row.inventoryItem_quantity
                            }
                        </TableCell>

                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              row.cost
                            }
                        </TableCell>

                        <TableCell
                          id={labelId}
                          scope="row"
                          padding='none'
                          sx={{color: 'text.white', paddingTop: '1rem', paddingBottom: '1rem'}}
                        >
                            {
                              new Date(row.inventoryItem_exp).toISOString().split('T')[0]
                            }
                        </TableCell>

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
                count={expiredTableRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{bgcolor: 'background.secondary', color: 'text.white'}}
            />
        </Paper>
        <PopUp
          title="Xóa sản phẩm"
          isOpen={openDeletePopUp}
          handleCloseBtnClick={() => {setOpenDeletePopUp(false); setSelected([]);}}
        >
          {
            <div className='flex flex-col'>
              <h2 className='text-white pb-5'>Bạn có chắc chắn muốn xóa sản phẩm này?</h2>
              <div className='flex justify-end gap-2'>
                <CustomButton
                  title='Hủy'
                  variant='secondary'
                  onAction={()=>{setOpenDeletePopUp(false); setSelected({})}}
                  className="py-1 px-4"
                />
                <CustomButton
                  title='Xác nhận'
                  onAction={handleOnDelete}
                  className="py-1 px-4"
                />
              </div>
            </div>
          }
        </PopUp>
        {
          isLoading && <Loading/>
        }
      </Box>
    );
}
