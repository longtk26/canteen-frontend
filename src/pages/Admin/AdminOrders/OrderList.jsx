import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TableSortLabel, TablePagination } from '@mui/material';
import { Card, CardMedia, CardContent, CardHeader, CardActions } from '@mui/material';
import {Input, Toolbar, Typography, Box, Paper, Button, Grid, Pagination, Stack } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomButton from '../../../components/CustomButton/CustomButton';
import PopUp from '../../../components/Popup/Popup';
import orderApi from "../../../api/orderApi";
import { Loading } from "../../../components";
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';

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
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.object)
};

function EnhancedTableToolbar(props) {
  const { selected, title } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        bgcolor: 'background.secondary'
      }}
    >
      {(
        <Typography
          sx={{ flex: '1 1 100%', color: '#EA7C69', fontWeight: 'fontWeight.tableTitle', fontSize: 'fontSize.tableTitle' }}
          variant="h1"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {/* {selected && (
        <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditIconClick}>
                  <EditIcon sx={{color: 'text.white', fontSize: 'fontSize.icon'}}/>
              </IconButton>
            </Tooltip>
        </>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
};

const OrderList = (props) => {
    const {headCells, title} = props;
    const {
      orderListRows, setOrderListRows, orderListOriginalRows, setOrderListOriginalRows
    } = useStaffInventoryContext();
    
    const [isLoading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [openCard, setOpenCard] = React.useState(false);
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [received, setReceived] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [change, setChange] = React.useState(0);
    const [isProcessing, setProcessing] = React.useState(false);
    const [isPending, setPending] = React.useState(false);
    const [openConfirmCancel, setOpenConfirmCancel] = React.useState(false);

    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");
    
    React.useEffect(() =>{
      const fetchOrders = async () => {
          try {
              setLoading(true);
              const res = await orderApi.getAllOrders({token, clientId});
              setOrderListRows(res.data);
              setOrderListOriginalRows(res.data);
              setLoading(false);
          } catch (error) {
          console.error('Error fetching orders:', error);
          }
      }
      fetchOrders();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //Handle on row click
    const handleClick = async (event, row) => {
      setSelected(row);
      setLoading(true);
      const res = await orderApi.getOrderDetail({token, clientId}, row._id);
      console.log(res);
      if (row.order_status == "processing"){
        setProcessing(true);
      }
      else if (row.order_status == "pending"){
        setPending(true);
      }

      if (res.data != null){
        setSelectedRowData(res.data.list_items);
      }
      else{
        setSelectedRowData([]);
      }

      setTotal(row.order_total_price);      
      setLoading(false);
      setOpenCard(true);
    };

    const handleReceivedChange = (value) => {
        setReceived(value);
        setChange(value - total);
    }

    const handleConfirm = async () => {
      setLoading(true);
      const res = await orderApi.completeOrder({token, clientId}, selected._id);
      console.log(res);
      const newData = await orderApi.getAllOrders({token, clientId});
      setOrderListRows(newData.data);
      setOrderListOriginalRows(newData.data);

      setProcessing(false);
      setPending(false);
      setLoading(false);
      setOpenCard(false);
    };
      
    const handleCancel = () => {
      setOpenConfirmCancel(true);
    };

    const confirmCancel = async () => {
        setLoading(true);
        const res = await orderApi.deleteOrder({token, clientId}, selected._id);
        console.log(res);
        const newData = await orderApi.getAllOrders({token, clientId});
        setOrderListRows(newData.data);
        setOrderListOriginalRows(newData.data);
        
        setOpenConfirmCancel(false);
        setProcessing(false);
        setPending(false);
        setLoading(false);
        setOpenCard(false);
    }

    const handleCloseCard = () => {
        setOpenCard(false);
        setProcessing(false);
        setPending(false);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (row) => selected === row;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderListRows.length) : 0;

    //console.log(emptyRows);
    const visibleRows = stableSort(orderListRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    //console.log(visibleRows);

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
                selected={Object.keys(selected).length === 0 ? false : true} 
                title={title}
             />
            <TableContainer>
              <Table
                  sx={{ minWidth: 750, bgcolor: 'background.secondary' }}
                  aria-labelledby="tableTitle"
                  size={'medium'}
              >
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox"></TableCell>
                        {headCells.map((cell, index) => (
                            <TableCell
                                key={cell.id}
                                id={labelId}
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
                component="div"
                count={orderListRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{bgcolor: 'background.secondary', color: 'text.white'}}
            />
        </Paper>
        <Dialog open={openCard} onClose={handleCloseCard} maxWidth="md" fullWidth>
            <Card className="col-span-1 fixed right-6 top-2 h-screen w-1/4 p-4 rounded-lg" sx={{ color: 'white', minWidth: '400', backgroundColor: 'background.secondary' }}>
                <Typography variant="h5">Mã đơn {selected._id}</Typography>
                <div style={{ display: 'grid', gridTemplateColumns: '45% 30% 20%', gridColumnGap: '10px', gridRowGap: '8px', marginBottom: '16px', fontWeight: 'bold' }}>
                    <Typography>Sản phẩm</Typography>
                    <Typography>Số lượng</Typography>
                    <Typography>Giá</Typography>
                </div>
                <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                    {selectedRowData && selectedRowData.map((selectedCard) => (
                        <div key={selectedCard.item_name}>
                        {/* First Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '45% 20% 25%', gridColumnGap: '10px', marginBottom: '2px', alignItems: 'center' }}>
                            <Card sx={{ 
                                backgroundColor: 'background.secondary',
                                display: 'flex', 
                                alignItems: 'center',
                                maxWidth: '100px',
                                maxHeight: '40px', }}>
                                <CardMedia
                                component="img" 
                                image={selectedCard.item_image}
                                alt={selectedCard.item_id}
                                sx={{
                                    maxWidth: '40px',
                                    maxHeight: '40px',
                                }}
                                />
                                <CardContent sx={{ textAlign: 'center', fontSize: 10 }}>
                                <Typography>{selectedCard.item_name}</Typography>
                                </CardContent>
                            </Card>
                            <Typography
                                variant="body1"
                                sx={{
                                    borderRadius: '4px',
                                    paddingLeft: '12px',
                                    backgroundColor: 'background.tertiary',
                                    color: 'white',
                                    display: 'inline-block',
                                    padding: '6px',
                                    marginLeft: '6px',
                                }}
                                >
                                {selectedCard.quantity || 1}
                            </Typography>
                            <Typography>{parseInt(selectedCard.quantity) * parseInt(selectedCard.item_price)}đ</Typography>
                        </div>
                        {/* Second Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '70% 20%', gridColumnGap: '16px',  marginBottom: '4px', alignItems: 'center' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                borderRadius: '4px',
                                paddingLeft: '5px',
                                backgroundColor: 'background.tertiary',
                                color: 'white',
                                display: 'inline-block',
                                padding: '6px',
                            }}
                            >
                            {selectedCard.note || 'Ghi chú...'}
                        </Typography>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="absolute left-4 bottom-6">
                <TableContainer>
                    <Table sx={{ minWidth: 300, bgcolor: 'background.secondary' }} size="small">
                    <TableBody>
                        <TableRow>
                        <TableCell sx={{color: 'white', minWidth: 150}}>Tổng</TableCell>
                        <TableCell sx={{color: 'white'}}>{total}đ</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                {isProcessing && (
                  <CustomButton
                    title={'Xác nhận hoàn tất'}
                    className="p-2 mt-2 w-full"
                    onAction={handleConfirm}
                  />
                )}
                {isPending && (
                  <CustomButton
                    title={'Hủy đơn hàng'}
                    className='p-2 mt-2 w-full'
                    onAction={handleCancel}
                  />
                )}
                </div>
            </Card>
        </Dialog>
        <PopUp
          title="Xác nhận hủy"
          isOpen={openConfirmCancel}
          handleCloseBtnClick={() => {setOpenConfirmCancel(false);}}
        >
          {
            <div className='flex flex-col'>
              <h2 className='text-white pb-5'>Xác nhận hủy đơn hàng?</h2>
              <div className='flex justify-between gap-2'>
                <CustomButton
                  title='Hủy'
                  variant='secondary'
                  onAction={()=>{setOpenConfirmCancel(false);}}
                  className="py-1 px-8"
                />
                <CustomButton
                  title='Xác nhận'
                  onAction={confirmCancel}
                  className="py-1 px-4"
                />
              </div>
            </div>
          }
        </PopUp>
      {isLoading && <Loading/>}
    </Box>
    );
}

export default OrderList;