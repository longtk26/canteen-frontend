import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailIcon, InvisibleIcon, PadlockIcon } from "../../assets/svgs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";

const Login = ({ onSubmitForm }) => {
  const [visiblePass, setVisiblePass] = useState(false);

  return (
    <div className="bg-form m-auto space-y-4 w-[80%] p-4 text-white">
      <h2 className="text-[30px]">Đăng nhập</h2>
      <div>
        <span className="block">Nếu bạn chưa có tài khoản</span>
        <span>
          Bạn có thể{" "}
          <Link to="/register" className="text-dark-pink font-bold">
            đăng ký tại đây
          </Link>
        </span>
      </div>

      <form onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="email">Email</label>
          <div className="border-b-2 border-white pb-2 flex items-center gap-x-[10px]">
            <EmailIcon className="mb-[2px]" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-10">
          <label htmlFor="password">Mật khẩu</label>
          <div className="border-b-2 border-white pb-2 flex items-center">
            <PadlockIcon className="mr-2 mb-[2px]" />
            <input
              id="password"
              name="password"
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

        <button
          type="submit"
          className="w-full bg-dark-pink rounded-[32px] px-2 py-[12px] text-white mt-16"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onSubmitForm: PropTypes.func,
};

export default Login;
