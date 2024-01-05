import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Form } from "./containers";
import { StaffInventoryProvider } from "./context/Staff/StaffInventoryContext";
import {
  UserHome,
  UserOrders,
  UserSetting,
  StaffDashBoard,
  StaffHome,
  StaffInventory,
  StaffReport,
  StaffDailyMenu,
  StaffSetting,
  StaffPreorders,
  AdminDashBoard,
  AdminManagement,
  AdminInventory,
  AdminOrders,
} from "./pages";

function App() {
  return (
    <StaffInventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Form type="login" />} />
          <Route path="/register" element={<Form type="register" />} />
          <Route path="/" element={<Layout> <StaffHome /> </Layout>} />
          <Route path="/user/home" element={<Layout> <UserHome /> </Layout>} />
          <Route path="/user/dashboard" element={<Layout> <UserHome /> </Layout>}/>
          <Route path="/user/orders" element={<Layout> <UserOrders /> </Layout>}/>
          <Route path="/user/setting" element={<Layout> <UserSetting /> </Layout>}/>
          <Route path="/staff/home" element={<Layout> <StaffHome /> </Layout>} />
          <Route path="/staff/dashboard" element={<Layout> <StaffDashBoard /> </Layout>}/>
          <Route path="/staff/inventory" element={<Layout> <StaffInventory /> </Layout>}/>
          <Route path="/staff/dailymenu" element={<Layout> <StaffDailyMenu /> </Layout>}/>
          <Route path="/staff/preorders" element={<Layout> <StaffPreorders /> </Layout>}/>
          <Route path="/staff/report" element={<Layout> <StaffReport /> </Layout>}/>
          <Route path="/staff/setting" element={<Layout> <StaffSetting /> </Layout>}/>
          <Route path="/admin/home" element={<Layout> <StaffHome /> </Layout>} />
          <Route path="/admin/dashboard" element={<Layout> <AdminDashBoard /> </Layout>}/>
          <Route path="/admin/management" element={<Layout> <AdminManagement /> </Layout>}/>
          <Route path="/admin/inventory" element={<Layout> <AdminInventory /> </Layout>}/>
          <Route path="/admin/orders" element={<Layout> <AdminOrders /> </Layout>}/>
        </Routes>
      </BrowserRouter>
    </StaffInventoryProvider>
  );
}

export default App;
