import React from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';

const CreateDailyMenu = ({onCreateMenu, closePopUp}) => {
    const [inputList, setInputList] = React.useState([
        {item_name: '', item_quantity:'', item_price: '', item_type: 'main', item_cost: '', item_image: ''}
    ]);

    const [errors, setErrors] = React.useState([
        {
            item_name: 'Không được để trống', 
            item_quantity:'Không được để trống',
            item_price: 'Không được để trống', 
            item_cost: 'Không được để trống', 
            item_image: ''
        }
    ]);

    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        //Handle validation
        const errorList = [...errors];
        if (name === 'item_name'){
            if (value.trim() === ''){
                errorList[index]['item_name'] = 'Không được để trống';
            }
            else
            {
                errorList[index]['item_name'] = '';
            }
            setErrors(errorList);
        }
        if (name === 'item_quantity'){
            if (value.trim() === ''){
                errorList[index]['item_quantity'] = 'Không được để trống';
            }
            else if (isNaN(Number(value))){
                errorList[index]['item_quantity'] = 'Số lượng phải là số';
            }
            else if (Number(value) < 0){
                errorList[index]['item_quantity'] = 'Số lượng không được âm';
            }
            else
            {
                errorList[index]['item_quantity'] = '';
            }
            setErrors(errorList);
        }
        if (name === 'item_price'){
            if (value.trim() === ''){
                errorList[index]['item_price'] = 'Không được để trống';
            }
            else if (isNaN(Number(value))){
                errorList[index]['item_price'] = 'Giá bán phải là số';
            }
            else if (Number(value) < 0){
                errorList[index]['item_price'] = 'Giá bán không được âm';
            }
            else
            {
                errorList[index]['item_price'] = '';
            }
            setErrors(errorList);
        }
        if (name === 'item_cost'){
            if (value.trim() === ''){
                errorList[index]['item_cost'] = 'Không được để trống';
            }
            else if (isNaN(Number(value))){
                errorList[index]['item_cost'] = 'Giá nhập phải là số';
            }
            else if (Number(value) < 0){
                errorList[index]['item_cost'] = 'Giá nhập không được âm';
            }
            else {
                errorList[index]['item_cost'] = '';
            }
            setErrors(errorList);
        }
    }

    const handleAddRow = () => {
        setInputList([...inputList, {item_name: '', item_quantity:'', item_price: '', item_type: 'main', item_cost: '', item_image: ''}]);
        setErrors([...errors, {
            item_name: 'Không được để trống', 
            item_quantity:'Không được để trống',
            item_price: 'Không được để trống', 
            item_cost: 'Không được để trống', 
            item_image: ''
        }]);
    }

    const handleRemoveRow = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);

        const errorList = [...errors];
        errorList.splice(index, 1);
        setErrors(errorList);
    }

    const handleCloseButton = () => {
        closePopUp();
    }

    const handleCreateImportNote = () => {
        onCreateMenu(inputList)
        closePopUp();
    }

    return (
    <div className='flex flex-col'>
        <CustomButton
            title='Thêm'
            onAction={handleAddRow}
            className="p-1.5 mb-4 w-[15%] self-end"
        />
        <form 
            className="flex flex-col min-w-[600px] max-h-[600px] overflow-y-auto"
            autoComplete='off'
        >
        {
            inputList.map((row, index) => (
                <div key={index} className='row flex gap-5 my-2'>
                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_name'
                        >
                            Tên sản phẩm
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='item_name'
                            id='item_name'
                            value={row.item_name}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        <div style={{ minHeight: '1.5rem' }}>
                            {
                                errors[index].item_name &&
                                <span className="text-red-500 text-sm">{errors[index].item_name}</span>
                            }
                        </div>
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_image'
                        >
                            Link ảnh sản phẩm
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='item_image'
                            id='item_image'
                            value={row.item_image}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_cost'
                        >
                            Giá nhập
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='item_cost'
                            id='item_cost'
                            value={row.item_cost}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].item_cost &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].item_cost}</span>
                        }
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_price'
                        >
                            Đơn giá
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='item_price'
                            id='item_price'
                            value={row.item_price}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].item_price &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].item_price}</span>
                        }
                    </div>
                    
                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_quantity'
                        >
                            Số lượng
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='item_quantity'
                            id='item_quantity'
                            value={row.item_quantity}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].item_quantity &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].item_quantity}</span>
                        }
                    </div>

                    {
                        //Keep at least one row
                        inputList.length !== 1 && 
                        <div className='flex items-center'>
                            <CustomButton
                                title='Xóa'
                                variant='danger'
                                onAction={()=>handleRemoveRow(index)}
                                className="px-5 py-2 me-4"
                            />
                        </div>
                    }
                </div>
            ))
        }
            
        </form>

        <div className='inline-grid grid-cols-2 mt-10 gap-4'>
            <CustomButton
                title='Hủy'
                variant='secondary'
                onAction={handleCloseButton}
                className="py-1.5"
            />
            <CustomButton
                title='Tạo'
                variant='tertiary'
                onAction={handleCreateImportNote}
                className="py-1.5"
                disabled = {
                    errors.some(errorObj => {
                        return Object.values(errorObj).some(errorMessage => errorMessage !== '');
                    })
                }
            />
        </div>
    </div>
    )
} 

export default CreateDailyMenu;