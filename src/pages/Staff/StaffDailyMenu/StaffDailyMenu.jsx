import React from 'react';
import ItemApi from '../../../api/itemsApi';
import Header from '../../../components/Header/Header'
import CustomButton from '../../../components/CustomButton/CustomButton';
import Popup from '../../../components/Popup/Popup';
import CreateDailyMenu from './CreateDailyMenu';
import DailyMenu from './DailyMenu';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { Loading } from '../../../components';
const StaffDailyMenu = () => {
    const [isMenuPopUpOpen, setMenuPopUpOpen] = React.useState(false);
    const [isDeletePopUpOpen, setDeletePopUpOpen] = React.useState(false);
    const [menu, setMenu] = React.useState([]);
    const [originalMenu, setOriginalMenu] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        const fetchMenuData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const clientId = localStorage.getItem('clientId');
                const res = await ItemApi.getItemsByType({token, clientId}, 'main');
                setOriginalMenu(res.data);
                setMenu(res.data);
                setLoading(false);
            } 
            catch (error) {
                //
            }
        };
        fetchMenuData();
    }, [])

    const handleCreateMenu = async (inputList) => {
        console.log(inputList);
        //use post method here to create new menu
        const createMenu = async () => {
            try {
                const token = localStorage.getItem('token');
                const clientId = localStorage.getItem('clientId');
                const body = {
                    "listItems": inputList
                }
                await ItemApi.createMainDish({token, clientId}, body);
                
                //Refetch menu
                const res = await ItemApi.getItemsByType({token, clientId}, 'main');
                setOriginalMenu(res.data);
                setMenu(res.data);
            } 
            catch (error) {
                //
            }
        }
        createMenu();
    }

    const handleOnDeleteMenu = async () => {
        const token = localStorage.getItem('token');
        const clientId = localStorage.getItem('clientId');
        //Call api to delete menu
        await ItemApi.deleteAllMainItem({token, clientId});

        //Refetch menu
        const res = await ItemApi.getItemsByType({token, clientId}, 'main');
        setOriginalMenu(res.data);
        setMenu(res.data);
        
        //Close pop up
        setDeletePopUpOpen(false);
    }

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
    };

    //console.log(menu)

    return (
    <>
        <div className='flex justify-between'>
            <Header heading="Món ăn chính hàng ngày"></Header>
            <div className='p-3'>
                <Searchbar
                  handleSearch={handleSearchBar}  
                  placeholder='Tìm tên...'
                />
            </div>
        </div> 
        <div className='ms-3 flex'>
            <CustomButton 
                title={'Tạo thực đơn hằng ngày'}
                className="p-2 me-5"
                onAction={() => {setMenuPopUpOpen(true)}}
            />
            {
                menu.length > 0 &&
                <CustomButton 
                    title={'Xóa thực đơn'}
                    variant='delete'
                    className="p-2 me-5"
                    onAction={() => {setDeletePopUpOpen(true)}}
                />
            }
            
        </div>
        <div className='menu border-0 rounded-md ms-3 mt-3'>
            {
                menu.length > 0 &&
                <DailyMenu data={menu}></DailyMenu>
            }
        </div>

        <Popup
            title="Tạo menu"
            isOpen={isMenuPopUpOpen}
            handleCloseBtnClick={() => {setMenuPopUpOpen(false)}}
        >
            <CreateDailyMenu onCreateMenu={handleCreateMenu} closePopUp={()=>{setMenuPopUpOpen(false)}}></CreateDailyMenu>
        </Popup>

        <Popup
            title="Xóa menu"
            isOpen={isDeletePopUpOpen}
            handleCloseBtnClick={() => {setDeletePopUpOpen(false)}}
        >
            {
                <div className='flex flex-col'>
                <h2 className='text-white pb-5'>Bạn có chắc chắn muốn xóa menu?</h2>
                <div className='flex justify-between gap-2'>
                    <CustomButton
                        title='Hủy'
                        variant='secondary'
                        onAction={()=>{setDeletePopUpOpen(false)}}
                        className="py-1 px-8"
                    />
                    <CustomButton
                        title='Xác nhận'
                        onAction={handleOnDeleteMenu}
                        className="py-1 px-4"
                    />
                </div>
                </div>
            }
        </Popup>
        {isLoading && <Loading />}
    </>
    )
}

export default StaffDailyMenu;