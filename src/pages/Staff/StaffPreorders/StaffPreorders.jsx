import React from "react";
import Header from "../../../components/Header/Header";
import PreorderList from "./PreorderList";
import Searchbar from '../../../components/SearchBar/SearchBar';
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';

const token = localStorage.getItem("token");
const clientId = localStorage.getItem("clientId");

const StaffPreorders = () => {
    const {
      setPreorderListRows, preorderListOriginalRows
    } = useStaffInventoryContext();
  
    const headCells = [
      {
        id: '_id',
        disablePadding: true,
        label: 'Mã đơn',
      },
      {
        id: 'time_receive',
        disablePadding: true,
        label: 'Thời gian nhận',
      },
      {
        id: 'order_total_price',
        disablePadding: true,
        label: 'Tổng tiền',
      },
      {
        id: 'order_status',
        disablePadding: true,
        label: 'Trạng thái',
      },
    ];

    const handleSearchBar = async (query) => {
      console.log(query);
      if (preorderListOriginalRows.length > 0) {
          if (query !== ""){
              const searchResult = preorderListOriginalRows.filter((item) => item.id.toLowerCase().includes(query.toLowerCase()));
              setPreorderListRows(searchResult);
          }
          else{
            setPreorderListRows(preorderListOriginalRows);
          }
      }
    };

    return (
      <>
        <div className='flex justify-between'>
          <Header heading="Đơn đặt trước"></Header>
          <div className='p-3'>
              <Searchbar
                handleSearch={handleSearchBar}  
                placeholder='Tìm kiếm đơn'
              />
          </div>
        </div>
    
        <div className="gap-x-16">
            <div className='ms-3 col-span-2'>
                <PreorderList headCells={headCells} title="Đơn đặt trước"></PreorderList>
            </div>
        </div>
      </>
    );
}

export default StaffPreorders;