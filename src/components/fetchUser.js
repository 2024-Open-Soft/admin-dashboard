import axios from "axios";
import { setUser } from "../redux/reducers/User";
import createToast from "../utils/createToast";

export async function fetchUserData(dispatch) {
  if (localStorage.getItem("token")) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(`/user/profile`, config)
      .then(({ data }) => {
        dispatch(setUser(data?.data));
        createToast(data?.message, "success");
        // console.log("userData : ", data);
      })
      .catch((err) => {
        createToast(err?.response?.data?.error, "error");
        if(err?.response?.data?.error === "Token Expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        console.log("err : ", err);
      });
  }
}
