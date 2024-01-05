import React from "react";
import UserApi from "../../../api/userApi";
import Header from "../../../components/Header/Header";
import Popup from "../../../components/Popup/Popup";
import EditForm from "./EditForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { toDatePickerFormat } from "../../../utils/util";
import { Loading } from "../../../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffSetting = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');
  const [isUpdatePopUpOpen, setUpdatePopUpOpen] = React.useState(false); 
  const [isPasswordPopUpOpen, setPasswordPopUpOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [staff, setStaff] = React.useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    birthday: '',
    phone: '',
  });

  React.useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const clientId = localStorage.getItem('clientId');
        const res = await UserApi.getUserInfo({ token, clientId }, clientId);
  
        const {
          attributes: { address, birthday, phone },
          ...rest
        } = res.data;

        let formattedBirthday = "";
        if (birthday) {
          formattedBirthday = toDatePickerFormat(birthday);
        }
        const newData = { ...rest, address, birthday: formattedBirthday, phone };
  
        //console.log(newData);
        setStaff(newData);
        setLoading(false);
      } catch (error) {
        // Handle errors
      }
    };
  
    fetchStaff();
  }, []);
  

  const handleUpdateInfo = (updatedData) => {
    const updateStaff = async () => {
      try {
        //console.log(updatedData);
        const response = await UserApi.updateInfo({token, clientId}, updatedData);
        if (response.error){
          toast.error('Lỗi cập nhật thông tin', {
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
        else
        {
          //Update UI
          toast.success('Cập nhật thành công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          const res = await UserApi.getUserInfo({ token, clientId }, clientId);
          const {
            attributes: { address, birthday, phone },
            ...rest
          } = res.data;
          const formattedBirthday = toDatePickerFormat(birthday);
          const newData = { ...rest, address, birthday: formattedBirthday, phone };
          setStaff(newData);
        }
      } 
      catch (error) {
        //
      }
    }
    updateStaff();
  }

  const handleUpdatePassword = async(newPassword) =>{
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId');
      //console.log(updatedData);
      const res = await UserApi.updateInfo({token, clientId}, newPassword);
      if (res.error){
        setLoading(false);
        toast.error('Lỗi cập nhật mật khẩu', {
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
      else
      {
        localStorage.removeItem('token');
        localStorage.removeItem('clientId');
        setLoading(false);
        navigate("/login");
      }
    } 
    catch (error) {
      
    }
  }

  return (
    <div>
      {staff && (
        <div className="flex flex-col">
          <div className='flex justify-between'>
              <Header heading="Thông tin cá nhân"></Header>
              <div className='p-3 flex max-h-[70px] self-center'>
                <CustomButton 
                  title={'Cập nhật thông tin'}
                  className="p-3 me-5"
                  onAction={() => {setUpdatePopUpOpen(true)}}
                />
                <CustomButton 
                  title={'Đổi mật khẩu'}
                  className="p-3 me-5"
                  onAction={() => {setPasswordPopUpOpen(true)}}
                />
              </div>
          </div> 
          <div className="flex flex-col gap-5 bg-slate-600 min-w-[800px] p-4 border-0 rounded-md self-center mt-7">
          <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='_id'
                >
                    Mã nhân viên
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-0'
                    name='_id'
                    id='_id'
                    value={staff._id}
                    autoComplete='off'
                    type='text'
                    readOnly={true}
                />
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='name'
                >
                    Tên nhân viên
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-0 sm:text-sm sm:leading-6'
                    name='name'
                    id='name'
                    value={staff.name}
                    autoComplete='off'
                    type='text'
                    readOnly={true}
                />
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='email'
                >
                    Email
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-0 sm:text-sm sm:leading-6'
                    name='email'
                    id='email'
                    value={staff.email}
                    autoComplete='off'
                    type='text'
                    readOnly={true}
                />
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='address'
                >
                    Địa chỉ
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-0 sm:text-sm sm:leading-6'
                    name='address'
                    id='address'
                    value={staff.address}
                    readOnly={true}
                    autoComplete='off'
                    type='text'
                />
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='birthday'
                >
                    Ngày sinh
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-0 sm:text-sm sm:leading-6'
                    name='birthday'
                    id='birthday'
                    value={staff.birthday}
                    readOnly={true}
                    autoComplete='off'
                    type='date'
                />
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='phone'
                >
                    Số điện thoại
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-0 sm:text-sm sm:leading-6'
                    name='phone'
                    id='phone'
                    value={staff.phone}
                    readOnly={true}
                    autoComplete='off'
                    type='text'
                />
            </div>
    
          </div>

          <Popup
            title="Chỉnh sửa thông tin cá nhân"
            isOpen={isUpdatePopUpOpen}
            handleCloseBtnClick={() => {setUpdatePopUpOpen(false)}}
          >
              <EditForm target={staff} onClose={()=>{setUpdatePopUpOpen(false)}} onSubmit={handleUpdateInfo}></EditForm>
          </Popup>

          <Popup
            title="Đổi mật khẩu"
            isOpen={isPasswordPopUpOpen}
            handleCloseBtnClick={() => {setPasswordPopUpOpen(false)}}
          >
              <ResetPasswordForm onClose={()=>{setPasswordPopUpOpen(false)}} onSubmit={handleUpdatePassword}></ResetPasswordForm>
          </Popup>

          <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
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
        </div> 
      )}
      {isLoading && <Loading/>}
    </div>
  );
};

export default StaffSetting;
