import React from 'react';
import Header from "../../../components/Header/Header"
import CustomButton from '../../../components/CustomButton/CustomButton';
import PopUp from '../../../components/Popup/Popup';
import StaffTable from './StaffTable/StaffTable';
import AddStaffForm from './AddStaffForm/AddStaffForm';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';

const AdminManagement = () => {
    const {
        setStaffTableRows, staffTableOriginalRows
    } = useStaffInventoryContext();
    
    const [openAddPopup, setOpenAddPopup] = React.useState(false);

    const handleAddOpenChange = (isOpen) => {
        setOpenAddPopup(isOpen);
    };

    const headCells = [
        {
            id: '_id',
            numeric: false,
            disablePadding: true,
            label: 'Mã người dùng',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Tên nhân viên',
        },
        {
            id: 'birthday',
            numeric: false,
            disablePadding: true,
            label: 'Ngày sinh',
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: true,
            label: 'Số điện thoại',
        },
        {
            id: 'address',
            numeric: false,
            disablePadding: true,
            label: 'Địa chỉ',
        },
    ];

    const handleSearchBar = async (query) => {
        console.log(query);
        if (staffTableOriginalRows.length > 0) {
            if (query !== ""){
                const searchResult = staffTableOriginalRows.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
                setStaffTableRows(searchResult);
            }
            else{
                setStaffTableRows(staffTableOriginalRows);
            }
        }
    };
    
    return (
        <div>
            <div className='flex justify-between'>
                <Header heading="Quản lý nhân viên"></Header>
                <div className='p-3'>
                    <Searchbar
                    handleSearch={handleSearchBar}  
                    placeholder='Tìm kiếm nhân viên...'
                    />
                </div>
            </div>
            <div className="ml-2">
                <CustomButton
                    title={'Thêm nhân viên'}
                    variant={'primary'}
                    className={'p-2'}
                    onAction={() => handleAddOpenChange(true)}
                />
            </div>

            <PopUp
                title="Thêm nhân viên"
                isOpen={openAddPopup}
                handleCloseBtnClick={() => handleAddOpenChange(false)}
            >
                {<AddStaffForm
                setOpen={() => handleAddOpenChange(false)}
                />}
            </PopUp>
            <div className="mt-2 p-2">
            <StaffTable headCells={headCells} title={''}/>
            </div>
        </div>
    );
};

export default AdminManagement;