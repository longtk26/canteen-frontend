import React from 'react'
const DailyMenu = ({data}) => {
    return (
        <div className="mt-3 row-container max-h-[550px] overflow-y-auto bg-dark-line border-2 border-dark-bg-2 rounded-md"> 
            <table className="table-auto w-full">
            <thead className='sticky top-0 bg-dark-bg-2 z-10'>
                <tr>
                    <th className='px-4 py-3 text-left text-white'>Tên món</th>
                    <th className='px-4 py-3 text-left text-white'>Hình ảnh</th>
                    <th className='px-4 py-3 text-left text-white'>Số lượng</th>
                    <th className='px-4 py-3 text-left text-white'>Giá bán</th>
                    <th className='px-4 py-3 text-left text-white'>Giá nhập</th>
                </tr>
            </thead>
            <tbody>
                {   data &&
                    data.map((row, index) => (
                        <tr key={index} className="border-t-2 border-dark-bg-2">
                            <td className="p-4">
                                <p className="text-sm font-semibold leading-6 text-white">{row.item_name}</p>
                            </td>
                            <td className="p-4">
                                <img className="h-[60px] w-[60px] flex-none bg-gray-50" src={row.item_image} alt="" />
                            </td>
                            <td className="p-4">
                                <p className="text-sm font-semibold leading-6 text-white">{row.item_quantity}</p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm font-semibold leading-6 text-white">{row.item_price}</p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm font-semibold leading-6 text-white">{row.item_cost}</p>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}
export default DailyMenu;