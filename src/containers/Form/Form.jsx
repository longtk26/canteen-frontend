import { useNavigate } from "react-router-dom";

import UserApi from "../../api/userApi";
import { background } from "../../assets/imgs";
import { Loading, Login, Register } from "../../components";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { useState } from "react";

const typeForm = {
  login: Login,
  register: Register,
};

const Form = ({ type = "login" }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const Element = typeForm[type];
  const navigate = useNavigate();

  const closeModal = () => setOpen(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const apiFn = type === "login" ? UserApi.login : UserApi.register;
    const data = {};

    // Create data body to fetch api
    for (let i = 0; i < e.target.length - 1; i++) {
      data[e.target[i].name] = e.target[i].value;
    }

    if (data.confirmPass) {
      if (data.password !== data.confirmPass) {
        setOpen(true);
        setContent("Mật khẩu không khớp");
        return;
      }
    }

    delete data.confirmPass;

    setLoading(true);
    const res = await apiFn(data);

    if (res.error) {
      setOpen(true);
      setContent(
        res.response?.data?.message || res.response?.data?.errors[0]?.msg
      );
      setLoading(false);
      return;
    }

    localStorage.setItem("token", res?.data?.token);
    localStorage.setItem("clientId", res?.data?.user?._id);
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");
    const response = await UserApi.loginSuccess({token, clientId});
    const role = response.data?.user?.role;
    setLoading(false);
    if (role === "admin"){
      return navigate('/admin/home');
    }
    else if (role === "staff"){
      return navigate('/staff/home');
    }
    else if (role === "user"){
      return navigate('/user/home');
    }
    else {
      return navigate('/');
    }
  };

  return (
    <main className="w-full h-[100vh] flex">
      <div className="hidden md:block md:basis-[50%] lg:basis-[60%] md:h-full md:bg-black">
        <img
          src={background}
          alt="school_hcmus"
          className="h-full object-cover w-full rounded-tr-[40px] rounded-br-[40px]"
        />
      </div>
      <div className="bg-form w-full md:basis-[50%] lg:basis-[40%] h-full flex font-poppin">
        <Element onSubmitForm={onSubmitForm} />
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        contentStyle={{
          backgroundColor: "#050214",
          width: "30%",
        }}
      >
        <div className="bg-form flex py-2">
          <h1 className="text-white m-auto text-sm">{content}</h1>
        </div>
      </Popup>
      {loading && <Loading />}
    </main>
  );
};

Form.propTypes = {
  type: PropTypes.string,
};

export default Form;
