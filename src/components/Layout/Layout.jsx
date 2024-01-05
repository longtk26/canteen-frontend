import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "../../containers";
import { listMenuBasedOnUser } from "../../constants";
import { useEffect } from "react";
import UserApi from "../../api/userApi";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");
  const isLogin = user ? true : false;
  useEffect(() => {
    if (token && clientId) {
      UserApi.loginSuccess({ token, clientId }).then((res) => {
        setUser(res?.data?.user);
      });
    } else {
      setUser(null);
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLogin && (
        <Container listMenuBasedOnUser={listMenuBasedOnUser[user.role]}>
          {children}
        </Container>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
