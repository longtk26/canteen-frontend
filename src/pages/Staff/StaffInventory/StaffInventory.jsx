import React from 'react';
import InventoryApi from '../../../api/inventoryApi';
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';
import Header from "../../../components/Header/Header"
import ExpiredProductTable from "./ExpiredProductTable/ExpiredProductTable";
import InventoryTable from "./InventoryTable/InventoryTable";
import CustomButton from '../../../components/CustomButton/CustomButton';
import PopUp from '../../../components/Popup/Popup';
import GRNForm from './GoodsReceivedNoteForm/GRNForm';
import GDNForm from './GoodsDeliveryNoteForm/GDNForm';

const StaffInventory = () => {
  //Inventory context
  const {
    setInventoryTableRows, setInventoryTableOriginalRows, setExpiredTableRows, setExpiredTableOriginalRows 
  } = useStaffInventoryContext();

  const [isImportPopUpOpen, setImportPopUpOpen] = React.useState(false);
  const [isExportPopUpOpen, setExportPopUpOpen] = React.useState(false);
 
  const headCells = [
    {
      id: '_id',
      numeric: false,
      disablePadding: true,
      label: 'Mã sản phẩm',
    },
    {
      id: 'inventoryItem_img',
      numeric: false,
      disablePadding: true,
      label: 'Ảnh',
    },
    {
      id: 'inventoryItem_name',
      numeric: false,
      disablePadding: true,
      label: 'Tên sản phẩm',
    },
    {
      id: 'inventoryItem_quantity',
      numeric: true,
      disablePadding: true,
      label: 'Số lượng',
    },
    {
      id: 'cost',
      numeric: true,
      disablePadding: true,
      label: 'Giá nhập',
    },
    {
      id: 'inventoryItem_exp',
      numeric: false,
      disablePadding: true,
      label: 'Hạn sử dụng',
    },
  ];

  const handleCreateGRN = (list) => {
    const createGoodReceiveNote = async() => {
      try {
        const token = localStorage.getItem('token');
        const clientId = localStorage.getItem('clientId');
        const body = {
          "userId": clientId,
          "item_list": list
        }
        const res = await InventoryApi.createGoodReceiveNote({token, clientId}, body);

        //Update Inventory Table
        const invenRes = await InventoryApi.getAllInventoryItems({token, clientId});
        const data = invenRes.data;
        setInventoryTableRows(data);
        setInventoryTableOriginalRows(data);

        //Update expired product table
        const expiredRes = await InventoryApi.getAllInventoryItems({token, clientId});
        setExpiredTableRows(expiredRes.data);
        setExpiredTableOriginalRows(expiredRes.data);
      } 
      catch (error) {
        //
      }
    }

    createGoodReceiveNote();
  }

  const handleCreateGDN = (list) => {
    const createGoodDeliveryNote = async() => {
      try {
        const token = localStorage.getItem('token');
        const clientId = localStorage.getItem('clientId');
        const body = {
          "userId": clientId,
          "item_list": list
        }
        const res = await InventoryApi.createGoodDeliveryNote({token, clientId}, body);

        //Update Inventory Table
        const invenRes = await InventoryApi.getAllInventoryItems({token, clientId});
        const data = invenRes.data;
        setInventoryTableRows(data);
        setInventoryTableOriginalRows(data);

        //Update expired product table
        const expiredRes = await InventoryApi.getAllExpiredProduct({token, clientId});
        setExpiredTableRows(expiredRes.data);
        setExpiredTableOriginalRows(expiredRes.data);
      } 
      catch (error) {
        //
      }
    }
    createGoodDeliveryNote();
  }

  return (
    <>
      <div>
        <Header heading="Quản lý kho"></Header>
      </div>
      <div className="ms-3">
        <CustomButton 
          title={'Tạo phiếu nhập kho'}
          className="p-2 me-5"
          onAction={() => {setImportPopUpOpen(true)}}
        />
        <CustomButton 
          title={'Tạo phiếu xuất kho'}
          className="p-2"
          onAction={() => {setExportPopUpOpen(true)}}
        />
      </div>
      
      <div className="mt-5 p-2">
        <InventoryTable 
          headCells={headCells} 
          title={'Kho'} 
        />
      </div>

      <div className="mt-5 p-2">
        <ExpiredProductTable 
          headCells={headCells} 
          title={'Sản phẩm hết hạn'} 
        />
      </div>

      <PopUp
        title="Phiếu nhập kho"
        isOpen={isImportPopUpOpen}
        handleCloseBtnClick={() => setImportPopUpOpen(false)}
      >
        <GRNForm 
          closePopUp={() => setImportPopUpOpen(false)}
          onSubmit={handleCreateGRN}
        />
      </PopUp>

      <PopUp
        title="Phiếu xuất kho"
        isOpen={isExportPopUpOpen}
        handleCloseBtnClick={() => setExportPopUpOpen(false)}
      >
        <GDNForm 
          closePopUp={() => setExportPopUpOpen(false)}
          onSubmit={handleCreateGDN}
        />
      </PopUp>
    </>
  );
};

export default StaffInventory;