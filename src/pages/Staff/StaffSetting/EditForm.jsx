import {useState} from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'

const EditForm = (props) => {
    const {target, onSubmit, onClose} = props
    const [editedTarget, setEditedTarget] = useState({
        _id: target._id || '', 
        name: target.name || '',
        address: target.address || '',
        birthday: target.birthday || '',
        phone: target.phone || ''
    });
    const [errors, setErrors] = useState({
        _id: '', 
        name: '',
        address: '',
        birthday: '',
        phone: ''
    });

    const handleSubmit = () => {
        const dataToSend = {
            "attributes": {
                "address": editedTarget.address,
                "birthday": editedTarget.birthday,
                "phone": editedTarget.phone
            }
        } 
        //console.log(dataToSend);
        onSubmit(dataToSend);
        onClose();
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
        if(name === 'name'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Tên không được để trống'
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
        if(name === 'address'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Địa chỉ không được để trống'
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

        //Gía nhập
        if(name === 'birthday'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Ngày sinh không được để trống'
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

        //Số lượng
        if(name === 'phone'){
            if (value === ''){
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Số điện thoại không được để trống'
                }))
            }
            else if (isNaN(Number(value)))
            {
                setErrors(prev => ({
                    ...prev,
                    [name]: 'Số điện thoại không hợp lệ'
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
            className="grid grid-cols-2 min-w-[800px] gap-5"
            autoComplete='off'
        >
            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='_id'
                >
                    Mã nhân viên
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='_id'
                    id='_id'
                    value={target._id}
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
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='name'
                    id='name'
                    value={editedTarget.name}
                    onChange={(e) => {handleInputChange("name", e.target.value) }}
                    autoComplete='off'
                    type='text'
                />
                {
                    errors.name && 
                    <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                }
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='email'
                >
                    Email
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='email'
                    id='email'
                    value={target.email}
                    autoComplete='off'
                    type='text'
                    readOnly={true}
                />
            </div>

            {/* <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='password'
                >
                    Mật khẩu
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='password'
                    id='password'
                    value={editedTarget.password}
                    onChange={(e) => {handleInputChange("password", e.target.value) }}
                    autoComplete='off'
                    type='password'
                />
            </div> */}

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='address'
                >
                    Địa chỉ
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='address'
                    id='address'
                    value={editedTarget.address}
                    onChange={(e) => {handleInputChange("address", e.target.value) }}
                    autoComplete='off'
                    type='text'
                />
                {
                    errors.address && 
                    <span className="text-red-500 text-sm mt-1">{errors.address}</span>
                }
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='birthday'
                >
                    Ngày sinh
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='birthday'
                    id='birthday'
                    value={editedTarget.birthday}
                    onChange={(e) => {handleInputChange("birthday", e.target.value) }}
                    autoComplete='off'
                    type='date'
                />
                {
                    errors.birthday && 
                    <span className="text-red-500 text-sm mt-1">{errors.birthday}</span>
                }
            </div>

            <div className='input flex flex-col'>
                <label
                    className='block text-white text-sm font-barlow font-medium leading-6'
                    htmlFor='phone'
                >
                    Số điện thoại
                </label>
                <input 
                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    name='phone'
                    id='phone'
                    value={editedTarget.phone}
                    onChange={(e) => {handleInputChange("phone", e.target.value) }}
                    autoComplete='off'
                    type='text'
                />
                {
                    errors.phone && 
                    <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
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
    </div>
    )
}

export default EditForm