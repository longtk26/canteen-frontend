import {useState} from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordForm = (props) => {
    const {onSubmit, onClose} = props
    const [editedTarget, setEditedTarget] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        password: 'Không được để trống',
        confirmPassword: 'Không được để trống'
    });

    const handleSubmit = () => {
        if (editedTarget.confirmPassword !== editedTarget.password){
            toast.error('Mật khẩu nhập lại không khớp', {
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
            const dataToSend = {
                password: editedTarget.confirmPassword
            } 
            console.log(dataToSend);
            onSubmit(dataToSend);
            onClose();
        }
    }

    const handleInputChange = (name, value) => {
        setEditedTarget((previous) => (
            {
                ...previous,
                [name]: value
            }
        ))
        
        //Form Validation
        //Tên mặt hàng
        if(name === 'password'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Không được để trống'
                }))
            }
            //Else, no error
            else{
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }))
            }
        }

        //Gía bán
        if(name === 'confirmPassword'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Không được để trống'
                }))
            }
            //Else, no error
            else{
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }))
            }
        }
    }

    return (
    <div className="flex flex-col">
        <form 
            className="flex flex-col min-w-[500px] gap-y-7"
            autoComplete='off'
        >
            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='password'
                >
                    Mật khẩu mới
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='password'
                    id='password'
                    value={editedTarget.password}
                    onChange={(e) => {handleInputChange("password", e.target.value) }}
                    autoComplete='off'
                    type='text'
                />
                {
                    errors.password && 
                    <span className="text-red-500 text-sm mt-1">{errors.password}</span>
                }
            </div>
            
            
            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='confirmPassword'
                >
                    Nhập lại mật khẩu
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={editedTarget.confirmPassword}
                    onChange={(e) => {handleInputChange("confirmPassword", e.target.value) }}
                    autoComplete='off'
                    type='text'
                />
                {
                    errors.confirmPassword && 
                    <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
                }
            </div>

        </form>
        <div className='grid grid-cols-2 gap-4 mt-2'>
            <CustomButton
                title='Hủy'
                variant='delete'
                onAction={onClose}
                className="p-2 mt-3"
            />

            <CustomButton
                title='Xác nhận'
                onAction={handleSubmit}
                className="p-2 mt-3"
                disabled = {
                    Object.values(errors).some(error => error !== '')
                }
            />
        </div>
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
    )
}

export default ResetPasswordForm;