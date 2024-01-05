import { Link } from "react-router-dom";
import {
  EmailIcon,
  InvisibleIcon,
  PadlockIcon,
  UserIcon,
} from "../../assets/svgs";
import { useState } from "react";
import PropTypes from "prop-types";

import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = ({ onSubmitForm }) => {
  const [visiblePass, setVisiblePass] = useState(false);

  return (
    <div className="bg-form m-auto space-y-4 w-[80%] p-4 text-white">
      <h2 className="text-[30px]">Đăng ký</h2>
      <div>
        <span className="block">Nếu bạn đã có tài khoản</span>
        <span>
          <Link to="/login" className="text-dark-pink font-bold">
            Đăng nhập!
          </Link>
        </span>
      </div>

      <form onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="email">Email</label>
          <div className="border-b-2 border-white pb-2 flex items-center gap-x-[10px]">
            <EmailIcon className="mb-[2px]" />
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="user">Tên người dùng</label>
          <div className="border-b-2 border-white pb-2 flex items-center gap-x-[10px]">
            <UserIcon className="mb-[2px]" />
            <input
              name="name"
              id="user"
              type="text"
              placeholder="Nhập tên người dùng của bạn"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="password">Mật khẩu</label>
          <div className="border-b-2 border-white pb-2 flex items-center">
            <PadlockIcon className="mr-2 mb-[2px]" />
            <input
              name="password"
              id="password"
              type={visiblePass ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="outline-none w-full bg-transparent"
            />
            <div
              onClick={() => {
                setVisiblePass((state) => !state);
              }}
            >
              {visiblePass ? (
                <VisibilityIcon />
              ) : (
                <InvisibleIcon className="hover:cursor-pointer" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="confirm-pass">Xác nhận mật khẩu</label>
          <div className="border-b-2 border-white pb-2 flex items-center">
            <PadlockIcon className="mr-2 mb-[2px]" />
            <input
              name="confirmPass"
              id="confirm-pass"
              type={visiblePass ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              className="outline-none w-full bg-transparent"
            />
            <div
              onClick={() => {
                setVisiblePass((state) => !state);
              }}
            >
              {visiblePass ? (
                <VisibilityIcon />
              ) : (
                <InvisibleIcon className="hover:cursor-pointer" />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-dark-pink rounded-[32px] px-2 py-[12px] text-white mt-16"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

Register.propTypes = {
  onSubmitForm: PropTypes.func,
};

export default Register;
