import React from 'react';
import Header from "../../../components/Header/Header"
import CustomButton from '../../../components/CustomButton/CustomButton';
import PopUp from '../../../components/Popup/Popup';
import ImportReportsTable from './ImportReports/ImportReportsTable';
import ExportReportsTable from './ExportReports/ExportReportsTable';

const StaffReport = () => {
  const importHeadCells = [
    {
      id: '_id',
      disablePadding: true,
      label: 'Mã phiếu',
    },
    {
      id: 'creator',
      disablePadding: true,
      label: 'Tên nhân viên',
    },
    {
      id: 'createdAt',
      disablePadding: true,
      label: 'Ngày lập phiếu',
    },
  ];

  const exportHeadCells = [
    {
      id: '_id',
      disablePadding: true,
      label: 'Mã phiếu',
    },
    {
      id: 'creator',
      disablePadding: true,
      label: 'Tên nhân viên',
    },
    {
      id: 'createdAt',
      disablePadding: true,
      label: 'Ngày lập phiếu',
    },
  ];

  return (
    <>
      <div>
        <Header heading="Phiếu xuất/nhập kho"></Header>
      </div>

      <div className="mt-5 p-2">
        <ImportReportsTable headCells={importHeadCells} title={'Phiếu nhập kho'}/>
      </div>

      <div className="mt-5 p-2">
        <ExportReportsTable headCells={exportHeadCells} title={'Phiếu xuất kho'}/>
      </div>
    </>
  );
};

export default StaffReport;