import React from 'react'
import {FormControl, FormLabel, TextField} from '@mui/material'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import userApi from '../../../../api/userApi';
import { useStaffInventoryContext } from '../../../../context/Staff/StaffInventoryContext';
import { Loading } from '../../../../components';

const AddStaffForm = (props) => {
    const {setOpen} = props;
    const [isLoading, setLoading] = React.useState(false);
  
    const {
        setStaffTableRows, setStaffTableOriginalRows
    } = useStaffInventoryContext();

    const [staff, setStaff] = React.useState({
        _id: '', 
        name: '',
        birthday: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    });

    const handleCancel = () =>{
        setOpen(false);
    };

    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");

    const handleSubmit = () => {
        const addStaff = async () => {
            setLoading(true);
            const attributes = {
                birthday: staff.birthday,
                phone: staff.phone,
                address: staff.address
            };
            const res = await userApi.createStaff({token, clientId}, staff.password, staff.email, staff.name, attributes);
            console.log(res);
            const newData = await userApi.getStaffList({token, clientId});

            const transformedData = newData.data.map(item => ({
              ...item,
              ...item.attributes // Spread attributes directly
            }));
      
            setStaffTableRows(transformedData);
            setStaffTableOriginalRows(transformedData);
            setLoading(false);
        }
        addStaff();
        setOpen(false);
    };

    const handleInputChange = (name, value) => {
        setStaff((previous) => (
            {
                ...previous,
                [name]: value
            }
        ))
    };

    const textFieldStyle = {
        marginBottom: '2rem',
    };
    return (
        <div>
        <form 
            className="flex flex-col min-w-[700px]"
            autoComplete='off'
        >
            <TextField
                variant='outlined'
                label="Họ và tên"
                name="name"
                value={staff.name}
                onChange={(e) => {handleInputChange("name", e.target.value) }}
                sx={textFieldStyle}
            />
            <TextField
                variant='outlined'
                label="Email"
                name="email"
                value={staff.email}
                onChange={(e) => {handleInputChange("email", e.target.value) }}
                sx={textFieldStyle}
            />
            <TextField
                variant='outlined'
                label="Mật khẩu"
                name="password"
                type="password"
                value={staff.password}
                onChange={(e) => {handleInputChange("password", e.target.value) }}
                sx={textFieldStyle}
            />
            <TextField
                type="date"
                label="Ngày sinh"
                value={staff.birthday}
                onChange={(e) => {handleInputChange("birthday", e.target.value) }}
                sx={textFieldStyle}
            />
            <TextField
                variant='outlined'
                label="Số điện thoại"
                name="phone"
                value={staff.phone}
                onChange={(e) => {handleInputChange("phone", e.target.value) }}
                sx={textFieldStyle}
            />
            <TextField
                variant='outlined'
                label="Địa chỉ"
                name="address"
                value={staff.address}
                onChange={(e) => {handleInputChange("address", e.target.value) }}
                sx={textFieldStyle}
            />
            <CustomButton
                title='Hủy'
                variant='secondary'
                onAction={handleCancel}
                className="p-2"
            />
            <CustomButton
                title='Xác nhận'
                variant='tertiary'
                onAction={handleSubmit}
                className="p-2"
            />
        </form>
        {isLoading && <Loading/>}
        </div>
    )
}

export default AddStaffForm