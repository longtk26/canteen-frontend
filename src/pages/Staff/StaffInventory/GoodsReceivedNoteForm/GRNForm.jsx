import React from 'react';
import CustomButton from '../../../../components/CustomButton/CustomButton'

const GRNForm = ({closePopUp, onSubmit}) => {
    const [inputList, setInputList] = React.useState([
        { inventoryItem_name: '', inventoryItem_img: '', cost: '', inventoryItem_quantity: '', inventoryItem_exp: '' }
    ]);

    const [errors, setErrors] = React.useState([
        { inventoryItem_name: 'Không được bỏ trống', inventoryItem_img: '', cost: 'Không được bỏ trống', inventoryItem_quantity: 'Không được bỏ trống', inventoryItem_exp: 'Không được bỏ trống' }
    ]);

    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        //Handle validation
        const errorList = [...errors];
        if (name === 'inventoryItem_name')
        {
            if (value.trim() === ''){
                errorList[index][name] = "Không được bỏ trống";
            }
            else{
                errorList[index][name] = "";
            }
            setErrors(errorList);
        }
        else if (name === 'cost')
        {
            if (value.trim() === ''){
                errorList[index][name] = "Không được bỏ trống";
            }
            else if (isNaN(Number(value))){
                errorList[index][name] = "Giá phải là số";
            }
            else if (Number(value) < 0){
                errorList[index][name] = "Giá không được âm";
            }
            else{
                errorList[index][name] = "";
            }
            setErrors(errorList);
        }
        else if (name === 'inventoryItem_quantity')
        {
            if (value.trim() === ''){
                errorList[index][name] = "Không được bỏ trống";
            }
            else if (isNaN(Number(value))){
                errorList[index][name] = "Số lượng phải là số";
            }
            else if (Number(value) < 0){
                errorList[index][name] = "Số lượng không được âm";
            }
            else{
                errorList[index][name] = "";
            }
            setErrors(errorList);
        }
        else if (name === 'inventoryItem_exp')
        {
            if (value.trim() === ''){
                errorList[index][name] = "Không được bỏ trống";
            }
            else{
                errorList[index][name] = "";
            }
            setErrors(errorList);
        }
    }

    const handleAddRow = () => {
        setInputList([...inputList, {inventoryItem_name: '', inventoryItem_img: '', cost: '', inventoryItem_quantity: '', inventoryItem_exp: ''}]);
        setErrors([...errors, {inventoryItem_name: 'Không được bỏ trống', inventoryItem_img: '', cost: 'Không được bỏ trống', inventoryItem_quantity: 'Không được bỏ trống', inventoryItem_exp: 'Không được bỏ trống'}]);
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
        const submitList = inputList.map(item => {
            return {
                ...item,
                cost: parseInt(item.cost),
                inventoryItem_quantity: parseInt(item.inventoryItem_quantity)
            }
        })
        console.log(submitList);
        onSubmit(submitList);
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
                            htmlFor='inventoryItem_name'
                        >
                            Tên sản phẩm
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_name'
                            id='inventoryItem_name'
                            value={row.inventoryItem_name}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        <div style={{ minHeight: '1.5rem' }}>
                            {
                                errors[index].inventoryItem_name &&
                                <span className="text-red-500 text-sm">{errors[index].inventoryItem_name}</span>
                            }
                        </div>
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='inventoryItem_img'
                        >
                            Link ảnh sản phẩm
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_img'
                            id='inventoryItem_img'
                            value={row.inventoryItem_img}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        <div style={{ minHeight: '1.5rem' }}>
                            {
                                errors[index].inventoryItem_img &&
                                <span className="text-red-500 text-sm">{errors[index].inventoryItem_img}</span>
                            }
                        </div>
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='cost'
                        >
                            Giá nhập
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='cost'
                            id='cost'
                            value={row.cost}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].cost &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].cost}</span>
                        }
                    </div>
                    
                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='inventoryItem_quantity'
                        >
                            Số lượng
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_quantity'
                            id='inventoryItem_quantity'
                            value={row.inventoryItem_quantity}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].inventoryItem_quantity &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].inventoryItem_quantity}</span>
                        }
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='inventoryItem_exp'
                        >
                            Hạn sử dụng
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_exp'
                            id='inventoryItem_exp'
                            value={row.inventoryItem_exp}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='date'
                        />
                        {
                            errors[index].inventoryItem_exp &&
                            <span className="text-red-500 text-sm mt-1">{errors[index].inventoryItem_exp}</span>
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

export default GRNForm