import React, { useState } from 'react';
import PopupButton from '../../../components/PopupButton/PopupButton';
import CurrentDate from '../../../components/CurrentDate/CurrentDate';
import { MoneyIcon, IncreaseIcon, DecreaseIcon, Management, OrderIcon, FilterIcon } from '../../../assets/svgs';
import DailyStorageReport from './DailyStorageReport/DailyStorageReport';
import DailyRevenueReport from './DailyRevenueReport/DailyRevenueReport';
import MonthlyRevenueReport from './MonthlyRevenueReport/MonthlyRevenueReport';
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';
import reportApi from '../../../api/reportApi';
import { Loading } from "../../../components";

const AdminDashBoard = () => {
  const {
    setDailyInventoryReports, setDailyIncomeReports, setMonthlyIncomeReports,
  } = useStaffInventoryContext();

  const [isLoading, setLoading] = React.useState(false);
  const headCells = [
    {
        id: 'item_id',
        numeric: false,
        disablePadding: true,
        label: 'Mã sản phẩm',
    },
    {
        id: 'inventoryName',
        numeric: false,
        disablePadding: true,
        label: 'Tên',
    },
    {
        id: 'quantity',
        numeric: false,
        disablePadding: true,
        label: 'Tồn kho',
    },
    {
        id: 'come',
        numeric: false,
        disablePadding: true,
        label: 'Nhập kho',
    },
    {
        id: 'leave',
        numeric: false,
        disablePadding: true,
        label: 'Xuất kho',
    }
  ];

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  
  React.useEffect(() => {
    const fetchReports = async () => {
        try {
          setLoading(true);
          const inventoryReports = await reportApi.getAllDailyInventoryReport({token, clientId});
          const dailyIncomeReports = await reportApi.getAllDailyIncomeReport({token, clientId});
          const monthlyIncomeReports = await reportApi.getAllMonthlyIncomeReport({token, clientId});
          setDailyInventoryReports(inventoryReports.data);
          setDailyIncomeReports(dailyIncomeReports.data);
          setMonthlyIncomeReports(monthlyIncomeReports.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching Reports:', error);
        }
    }
    fetchReports()
  }, []);

  const getReport = () =>{
    console.log('popup');
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col p-3">
            <div className="font-barlow text-4xl text-white">
              Báo cáo
            </div>
            <div className="mt-2">
              <CurrentDate />
            </div>
        </div>
      </div>
      {/*<div className="flex gap-4">
        <div className='box-border text-white bg-dark_bg border-dark_bg h-fit w-fit p-5 border-4 rounded-lg'>
          <div className='flex items-center gap-2'>
            <MoneyIcon className='w-8 bg-dark_line m-1 rounded-md'/>
            <span className='text-emerald-500'>+32.40%</span>
            <IncreaseIcon className='w-6 bg-emerald-800 rounded-full'/>
          </div>
          <span className='text-3xl'>1,234,000đ</span><br></br>
          Doanh thu
        </div>
        <div className='box-border text-white bg-dark_bg border-dark_bg h-fit w-fit p-5 border-4 rounded-lg'>
          <div className='flex items-center gap-2'>
            <OrderIcon className='w-8 bg-dark_line m-1 rounded-md'/>
            <span className='text-red-400'>-12.40%</span>
            <DecreaseIcon className='w-6 bg-red-800 rounded-full'/>
          </div>
          <span className='text-3xl'>2,345</span><br></br>
          Tổng món ăn đã đặt
        </div>
        <div className='box-border text-white bg-dark_bg border-dark_bg h-fit w-fit p-5 border-4 rounded-lg'>
          <div className='flex items-center gap-2'>
            <Management className='w-8 bg-dark_line m-1 p-1 rounded-md'/>
            <span className='text-emerald-500'>+2.40%</span>
            <IncreaseIcon className='w-6 bg-emerald-800 rounded-full'/>
          </div>
          <span className='text-3xl'>1,234</span><br></br>
          Tổng người dùng hôm nay
        </div>
      </div>*/}
      <div className='bg-dark_bg h-auto p-10 mt-5 rounded-lg text-white grid gap-2'>
        <PopupButton 
          title={'Báo cáo kho theo ngày'}
          className="p-3 w-80 rounded-lg"
          onAction={getReport}
        >
          {<DailyStorageReport headCells={headCells} title={'Báo cáo kho ngày '}/>}
        </PopupButton>
        <PopupButton 
          title={'Báo cáo doanh thu theo ngày'}
          className="p-3 w-80 rounded-lg"
          onAction={getReport}
        >
          {<DailyRevenueReport title={'Báo cáo doanh thu ngày '}/>}
        </PopupButton>
        <PopupButton 
          title={'Báo cáo doanh thu theo tháng'}
          className="p-3 w-80 rounded-lg"
          onAction={getReport}
        >
          {<MonthlyRevenueReport title={'Báo cáo doanh thu '}/>}
        </PopupButton>
      </div>
      {isLoading && <Loading/>}
    </div>
  );
};

export default AdminDashBoard;