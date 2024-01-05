import React from 'react';
import InventoryApi from '../../../../api/inventoryApi';
import CustomButton from '../../../../components/CustomButton/CustomButton'

const GDNForm = ({closePopUp, onSubmit}) => {
    const [inputList, setInputList] = React.useState([
        {inventoryItem: '', inventoryItem_quantity: '', inventoryItem_name: '', price: '', item_quantity: ''}
    ]);

    const [errors, setErrors] = React.useState([
        {
            inventoryItem_name: 'Chưa chọn', 
            price: 'Không được bỏ trống', 
            item_quantity: 'Không được bỏ trống'
        }
    ]);

    const [originalList, setOriginalList] = React.useState([]);

    //Get list of products in the inventory
    React.useEffect(() => {
        const getOriginalList = async () => {
            const token = localStorage.getItem('token');
            const clientId = localStorage.getItem('clientId');
            try{
                const res = await InventoryApi.getAllInventoryItems({token, clientId});
                const data = res.data;
                setOriginalList(data);
            }
            catch(e){
                console.log(e);
            }
        }
        getOriginalList();
    }, [])

    const handleNameInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        if (value === "no_option"){
            list[index]['inventoryItem'] = '';
            list[index]['inventoryItem_name'] = '';
            list[index]['inventoryItem_quantity'] = '';
            list[index]['price'] = '';
            list[index]['item_quantity'] = '';
            setInputList(list);

            //Handle validation        
            const errorList = [...errors];
            errors[index]['inventoryItem_name'] = 'Chưa chọn';
            errors[index]['price'] = 'Không được bỏ trống';
            errors[index]['item_quantity'] = 'Không được bỏ trống';
            setErrors(errorList);
        }
        else{
            const selectedProductId = value;
            const selectedProduct = originalList.find(product => product._id === selectedProductId);
            
            //Check if the selected product is already in the input list
            if (inputList.some(item => selectedProductId === item.inventoryItem)){
                if (selectedProduct) {
                    list[index]['inventoryItem'] = selectedProduct._id;
                    list[index]['inventoryItem_name'] = selectedProduct.inventoryItem_name;
                    list[index]['inventoryItem_quantity'] = selectedProduct.inventoryItem_quantity;
                }
                setInputList(list);

                //Raise error
                const errorList = [...errors];
                errors[index]['inventoryItem_name'] = 'Sản phẩm đã được chọn rồi';
                setErrors(errorList);  
            }
            else {
                if (selectedProduct) {
                    list[index]['inventoryItem'] = selectedProduct._id;
                    list[index]['inventoryItem_name'] = selectedProduct.inventoryItem_name;
                    list[index]['inventoryItem_quantity'] = selectedProduct.inventoryItem_quantity;
                }
                setInputList(list);

                //Clear error list
                const errorList = [...errors];
                errors[index]['inventoryItem_name'] = '';
                setErrors(errorList);
            }
        }
    };
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        
        list[index][name] = value;
        setInputList(list);

        //Handle validation
        const errorList = [...errors];
        if (name === 'price'){
            if (value.trim() === ''){
                errors[index]['price'] = 'Không được bỏ trống';
            }
            else if (isNaN(Number(value))){
                errors[index]['price'] = 'Giá bán phải là số';
            }
            else if (Number(value) < 0){
                errors[index]['price'] = 'Giá bán không được âm';
            }
            else{
                errors[index]['price'] = '';
            }
            setErrors(errorList);
        }
        if (name === 'item_quantity'){
            if (value.trim() === ''){
                errors[index]['item_quantity'] = 'Không được bỏ trống';
            }
            else if (isNaN(Number(value))){
                errors[index]['item_quantity'] = 'Số lượng phải là số';
            }
            else if (Number(value) < 0){
                errors[index]['item_quantity'] = 'Số lượng không được âm';
            }
            else if (Number(value) > Number(list[index]['inventoryItem_quantity'])){
                errors[index]['item_quantity'] = 'Vượt quá số lượng trong kho';
            }
            else{
                errors[index]['item_quantity'] = '';
            }
            setErrors(errorList);
        }
    };

    const handleAddRow = () => {
        setInputList([...inputList, {inventoryItem: '', inventoryItem_quantity: '', inventoryItem_name: '', price: '', item_quantity: ''}]);
        setErrors([...errors, {
            inventoryItem_name: 'Chưa chọn', 
            price: 'Không được bỏ trống', 
            item_quantity: 'Không được bỏ trống'
        }])
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

    const handleCreateExportNote = () => {
        //console.log(inputList);
        const submitData = inputList.map(item => {
            return {
                "price": item.price,
                "inventoryItem": item.inventoryItem,
                "item_quantity": item.item_quantity
            }
        })
        onSubmit(submitData);
        closePopUp();
    }

    // console.log(inputList);
    // console.log(errors);
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
                <div key={index} className='row flex my-2 gap-5'>
                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='inventoryItem_name'
                        >
                            Tên sản phẩm
                        </label>
                        <select
                            className='block w-full rounded-md border-0 py-2 px-7 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_name'
                            id='inventoryItem_name'
                            value={row.inventoryItem || 'no_option'}
                            onChange={e => handleNameInputChange(e, index)}
                            autoComplete='off'
                        >
                            <option value="no_option">-- Chọn sản phẩm --</option>
                            {
                                originalList.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.inventoryItem_name}
                                    </option>
                                ))
                            }
                        </select>
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
                            htmlFor='inventoryItem_quantity'
                        >
                            Số lượng trong kho
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='inventoryItem_quantity'
                            id='inventoryItem_quantity'
                            value={row.inventoryItem_quantity}
                            autoComplete='off'
                            readOnly={true}
                            type='text'
                        />
                    </div>

                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='price'
                        >
                            Giá bán
                        </label>
                        <input 
                            className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                            name='price'
                            id='price'
                            min='1'
                            value={row.price}
                            onChange={e => handleInputChange(e, index)}
                            autoComplete='off'
                            type='text'
                        />
                        {
                            errors[index].price &&
                            <span className="text-red-500 text-sm">{errors[index].price}</span>
                        }
                    </div>
                    
                    <div className='input flex flex-col'>
                        <label
                            className='block text-white text-sm font-barlow font-medium leading-6'
                            htmlFor='item_quantity'
                        >
                            Số lượng xuất kho
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
                            <span className="text-red-500 text-sm">{errors[index].item_quantity}</span>
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
                onAction={handleCreateExportNote}
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

export default GDNForm