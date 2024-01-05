const BASE_URL = "https://canteen-management-i2fe.onrender.com/v1/api";
const LOCAL_URL = "http://localhost:8080/v1/api";

const configHeader = ({ token, clientId }) => {
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
    "x-client-id": clientId,
  };
};

export { BASE_URL, LOCAL_URL, configHeader };
