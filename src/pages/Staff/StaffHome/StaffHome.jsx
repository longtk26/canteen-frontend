import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Input, Typography, Breadcrumbs, Link, Table, TableBody, TableCell, TableContainer, TableRow, Card, CardMedia, CardContent, CardHeader, CardActions, Button, Grid, Pagination, Stack } from '@mui/material';
import CustomButton from "../../../components/CustomButton/CustomButton";
import Header from "../../../components/Header/Header";
import { DeleteIcon } from '../../../assets/svgs/index';
import Searchbar from '../../../components/SearchBar/SearchBar';
import PopUp from '../../../components/Popup/Popup';
import itemsApi from '../../../api/itemsApi';
import orderApi from '../../../api/orderApi';
import userApi from '../../../api/userApi';
import { Loading } from "../../../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const itemsPerPage = 6;

const useStyles = (isActive) => ({
  color: isActive ? '#EA7C69' : 'white',
  '&:hover': {
    color: '#EA7C69',
  },
});

const StaffHome = () => {
  const [menu, setMenu] = React.useState([]);
  const [mainMenu, setMainMenu] = React.useState([]);
  const [invenMenu, setInvenMenu] = React.useState([]);
  const [originalMenu, setOriginalMenu] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState('Món chính');
  const [page, setPage] = React.useState(1);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [received, setReceived] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [change, setChange] = React.useState(0);
  const [confirmPopup, setConfirmPopup] = React.useState(false);
  const [error, setError] = React.useState(false); 
  const [success, setSuccess] = React.useState(false); 
  const [message, setMessage] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    _id: '',
    name: ''
  });

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  
  // Function to calculate the total value
  const calculateTotal = (selectedCards) => {
    let sum = 0;
    selectedCards.forEach((card) => {
      sum += card.total;
    });
    
    setTotal(sum);
    setChange(received - sum);
  };

  const handleReceivedChange = (value) => {
    setReceived(value);
    setChange(value - total);
  }

  const handleQuantityChange = (cardId, quantity) => {
    const updatedSelectedCards = selectedCards.map((card) => {
      if (card._id === cardId) { 
        if (quantity > card.item_quantity){
          quantity = card.item_quantity;
        }
        const total = parseInt(card.item_price) * parseInt(quantity);
        return { ...card, quantity, total };
      }
      return card;
    });
    setSelectedCards(updatedSelectedCards);
    calculateTotal(updatedSelectedCards);
  };

  const handleBreadcrumbClick = (category) => {
    if (category == 'Món chính'){
      setMenu(mainMenu);
      setOriginalMenu(mainMenu);
    }
    else if (category == 'Các món khác'){
      setMenu(invenMenu);
      setOriginalMenu(invenMenu);
    }
    setCurrentCategory(category);
    setPage(1);
  };

  const handleClose = () => {
    setError(false);
    setSelectedCards([]);
  }

  const handleSuccess = () => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const inven = await itemsApi.getItemsByType({token, clientId}, 'inven');
        setInvenMenu(inven.data);
        const main = await itemsApi.getItemsByType({token, clientId}, 'main');
        setMainMenu(main.data);
        setMenu(main.data);
        setOriginalMenu(main.data);
        setLoading(false);
      } catch (error) {
      }
    };

    fetchMenuData();
    setSuccess(false);
    setSelectedCards([]);
    setTotal(0);
    setChange(0);
    setReceived(0);
  }

  const handleConfirm = () => {
    const createNewOrder = async () => {
      setLoading(true);
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      const transformedData = selectedCards.map(item => ({
          item_name: item.item_name,
          item_id: item._id,
          item_quantity: item.quantity,
          item_note: item.note || ''
      }));
      const res = await orderApi.createOrder({token, clientId}, transformedData, currentTime);
      const confirm = await orderApi.confirmPayment({token, clientId}, res.data._id);
      setConfirmPopup(false);
      setLoading(false);
      handleSuccess();
      toast.success('Đặt đơn thành công', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };

    if (change >= 0) {
      if (selectedCards.length != 0){
        createNewOrder();
        setSuccess(true);
      }
      else {
        setMessage('Đơn hàng không được bỏ trống');
        setError(true);
      }
    }
    else{
      setMessage('Số tiền nhận vào không hợp lệ');
      setError(true);
    }
  };

  const handleCancel = () => {
    setSelectedCards([]);
    setTotal(0);
    setChange(0);
    setReceived(0);
    if (selectedCards){
      toast.warning('Đã hủy đơn', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await userApi.getUserInfo({ token, clientId }, clientId);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        // Handle errors
      }
    };
  
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const inven = await itemsApi.getItemsByType({token, clientId}, 'inven');
        setInvenMenu(inven.data);
        const main = await itemsApi.getItemsByType({token, clientId}, 'main');
        setMainMenu(main.data);
        setMenu(main.data);
        setOriginalMenu(main.data);
        setLoading(false);
      } catch (error) {
      }
    };

    fetchUser();
    fetchMenuData();
  }, []);

  const handleSearchBar = async (query) => {
    console.log(query);
    if (originalMenu.length > 0) {
        if (query !== ""){
            const searchResult = originalMenu.filter((item) => item.item_name.toLowerCase().includes(query.toLowerCase()));
            setMenu(searchResult);
        }
        else{
            setMenu(originalMenu);
        }
    }
  }
  const titles = ['Món chính', 'Các món khác'];

  const pageCount = Math.ceil(menu.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCardClick = (item) => {
    if (!selectedCards.some((card) => card._id === item._id)) {
      setSelectedCards((prevSelectedCards) => {
        const newCard = { ...item, quantity: 1, total: parseInt(item.item_price)};
        const updatedSelectedCards = [...prevSelectedCards, newCard];
        calculateTotal(updatedSelectedCards);
        return updatedSelectedCards;
      });
    }
  };

  const handleDelete = (selectedCardId) => {
    setSelectedCards((prevSelectedCards) => {
      const updatedSelectedCards = prevSelectedCards.filter((card) => card._id !== selectedCardId);
      calculateTotal(updatedSelectedCards);
      return updatedSelectedCards;
    });
  };

  const handleInputChange = (selectedCardId, field, value) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.map((card) =>
        card._id === selectedCardId ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <div className="relative grid grid-cols-[1fr_1fr_400px]">
      <Header className='col-span-1' heading={user.name}></Header>
      <div className='col-span-1 p-3'>
            <Searchbar
              handleSearch={handleSearchBar}  
              placeholder='Tìm tên...'
            />
      </div>
      <div></div>
      <div className="col-span-2">
        <div className="ms-3">
          <Breadcrumbs aria-label="breadcrumb" className="p-2 me-5">
            {titles.map((title, index) => (
              <Link
                key={index}
                color="inherit"
                underline='none'
                href="#"
                sx={useStyles(currentCategory === title)}
                onClick={() => handleBreadcrumbClick(title)}
              >
                {title}
              </Link>
            ))}
          </Breadcrumbs>
        </div>

        <div className="mt-5 p-2">
          <Card sx={{ backgroundColor: 'background.tertiary', marginLeft: '10px', boxShadow: 'none'}}>
            <Grid container spacing={3}>
              {(menu.slice((page - 1) * itemsPerPage, page * itemsPerPage) || []).map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    border: 'rounded',
                    color: 'white', 
                    bgcolor: '#1F1D2B',
                    borderRadius: '12px',
                    '&:hover': {
                      cursor: 'pointer',
                      bgcolor: 'background.tertiary',
                  },}}
                    onClick={() => handleCardClick(item)}
                  >
                    <CardMedia 
                      component="img" 
                      image={item.item_image} 
                      alt={item._id}
                      sx={{
                        maxWidth: '100%',
                        height: '200px',
                        objectFit: 'fill'
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography className='text-primary'>{item.item_name}</Typography>
                      <Typography>{item.item_price}đ</Typography>
                      <Typography>Số lượng còn lại: {item.item_quantity}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
          <Stack spacing={2} mt={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              color="primary"
              size="large"
              shape='rounded'
              sx={{ mx: 'auto'}}
            />
          </Stack>
        </div>
      </div>

      <Card className="col-span-1 fixed right-6 w-1/4 h-screen p-4 rounded-lg" sx={{ color: 'white', minWidth: '400', backgroundColor: 'background.secondary' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '45% 30% 20%', gridColumnGap: '10px', griditemGap: '8px', marginBottom: '16px', fontWeight: 'bold' }}>
            <Typography>Sản phẩm</Typography>
            <Typography>Số lượng</Typography>
            <Typography>Giá</Typography>
          </div>
        <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          {selectedCards.map((selectedCard) => (
            <div key={selectedCard._id}>
              {/* First item */}
              <div style={{ display: 'grid', gridTemplateColumns: '50% 20% 20%', gridColumnGap: '10px', marginBottom: '2px', alignItems: 'center' }}>
                <Card sx={{ 
                  backgroundColor: 'background.secondary',
                  display: 'flex', 
                  alignItems: 'center',
                  maxHeight: '40px', }}>
                  <CardMedia
                    component="img" 
                    image={selectedCard.item_image}
                    alt={selectedCard._id}
                    sx={{
                      maxWidth: '40px',
                      maxHeight: '40px',
                    }}
                  />
                  <CardContent sx={{ textAlign: 'left', fontSize: 10}}>
                    <Typography>{selectedCard.item_name}</Typography>
                    <Typography>{selectedCard.item_price}đ</Typography>
                  </CardContent>
                </Card>
                <Input
                  className='w-full -ms-3'
                  type="number"
                  value={selectedCard.quantity || 1}
                  inputProps={{ min: 1 }}
                  onChange={(e) => handleQuantityChange(selectedCard._id, e.target.value)}
                  sx={{
                    borderRadius: '4px',
                    paddingLeft: '12px',
                    backgroundColor: 'background.tertiary',
                    color: 'white'
                  }}
                />
                <Typography>{`${parseInt(selectedCard.quantity) * parseInt(selectedCard.item_price)} đ`}</Typography>
              </div>
              {/* Second item */}
              <div style={{ display: 'grid', gridTemplateColumns: '70% 20%', gridColumnGap: '16px',  marginBottom: '4px', alignItems: 'center' }}>
              <Input
                  type="text"
                  value={selectedCard.note}
                  defaultValue={'Ghi chú...'}
                  onChange={(e) => handleInputChange(selectedCard._id, 'note', e.target.value)}
                  sx={{
                    borderRadius: '4px',
                    paddingLeft: '5px',
                    backgroundColor: 'background.tertiary',
                    color: 'white'
                  }}
                />
                <Button
                  onClick={() => handleDelete(selectedCard._id)}
                  sx={{
                    border: '1px solid red',
                    borderColor: '#FF7CA3',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: '#FAA5BE',
                      color: 'white',
                    },
                  }}>
                  <DeleteIcon className="w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 right-0 w-full bottom-6">
        <TableContainer>
        <Table sx={{ minWidth: 300, bgcolor: 'background.secondary' }} size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{color: 'white', minWidth: 150}}>Tổng</TableCell>
              <TableCell sx={{color: 'white'}}>{total}đ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{color: 'white', minWidth: 150}}>Đã nhận</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={received}
                  onChange={(e) => handleReceivedChange(e.target.value)}
                  style={{color: 'white'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{color: 'white', minWidth: 150}}>Tiền thừa</TableCell>
              <TableCell sx={{color: 'white'}}>{change}đ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
        <CustomButton
          title={'Xác nhận thanh toán'}
          className="p-2 mt-2 w-full"
          onAction={()=>{setConfirmPopup(true)}}
          variant='tertiary'
        />
        <CustomButton
          title={'Hủy'}
          className='p-2 mt-2 w-full'
          onAction={handleCancel}
          variant='secondary'
        />
        </div>
      </Card>
      <PopUp
        title="Xác nhận"
        isOpen={confirmPopup}
        handleCloseBtnClick={() => {setConfirmPopup(false);}}
      >
        {
          <div className='flex flex-col'>
            <h2 className='text-white pb-5'>Bạn có muốn xác nhận thanh toán?</h2>
            <div className='flex justify-between gap-2'>
              <CustomButton
                title='Hủy'
                variant='secondary'
                onAction={()=>{setConfirmPopup(false);}}
                className="py-1 px-8"
              />
              <CustomButton
                title='Xác nhận'
                onAction={handleConfirm}
                className="py-1 px-4"
              />
            </div>
          </div>
        }
      </PopUp>

      <div>
        <ToastContainer
            position="top-right"
            autoClose={200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            />
      </div>
      {isLoading && <Loading/>}
    </div>
  );
};

export default StaffHome;
