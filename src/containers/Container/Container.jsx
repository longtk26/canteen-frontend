import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Logo, LogoutIcon } from "../../assets/svgs";
import PopUp from "../../components/Popup/Popup";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserApi from "../../api/userApi";

const Container = ({ listMenuBasedOnUser, children }) => {
  const [isLogOutPopUpOpen, setLogOutPopUpOpen] = useState(false);
  const navigate = useNavigate();
  const handleOnLogOut = async () => {
    setLogOutPopUpOpen(false);
    try{
      const token = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId');
      UserApi.logout({token, clientId}).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('clientId');
        navigate("/login");
      });
    }
    catch(err){
      //
    }
  }

  return (
    <main className="w-full h-[100vh] flex bg-dark-line">
      <aside
        className="w-[104px] max-h-screen bg-dark-bg-2 flex flex-col items-center 
      gap-10 rounded-tr-[10px] rounded-br-[10px] overflow-y-auto"
      >
        {/* Logo */}
        <div className="mt-4 p-4 bg-[#EB966A]/30 rounded-lg">
          <Logo className="w-[28px] h-[28px]" />
        </div>

        {/* List menu features */}
        <ul className="flex flex-col gap-4">
          {listMenuBasedOnUser.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}>
                  {
                    <div className="p-4 hover:bg-[#EB966A]/30 rounded-lg">
                      <item.icon className="fill-primary w-[20px] h-[20px]" />
                    </div>
                  }
                </NavLink>
              </li>
          ))}
        </ul>

        <button>{
          <LogoutIcon className="fill-primary w-[20px] h-[20px] mb-10" onClick={()=>{setLogOutPopUpOpen(true)}}></LogoutIcon>
        }</button>
      </aside>

      <section className="grow overflow-y-auto">
        <div className="m-4">
          {children}
        </div>
      </section>

      <PopUp
        title="Đăng xuất"
        isOpen={isLogOutPopUpOpen}
        handleCloseBtnClick={() => {setLogOutPopUpOpen(false)}}
      >
        {
          <div className='flex flex-col'>
            <h2 className='text-white pb-5'>Bạn có chắc chắn muốn đăng xuất?</h2>
            <div className='flex justify-between gap-2'>
                <CustomButton
                    title='Hủy'
                    variant='secondary'
                    onAction={() => {setLogOutPopUpOpen(false)}}
                    className="py-1 px-8"
                />
                <CustomButton
                    title='Xác nhận'
                    onAction={handleOnLogOut}
                    className="py-1 px-4"
                />
            </div>
          </div>
        }
      </PopUp>
    </main>
  );
};

Container.propTypes = {
  listMenuBasedOnUser: PropTypes.array,
  children: PropTypes.node,
};

export default Container;
