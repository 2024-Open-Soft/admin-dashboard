import axios from "axios";
import { setUser } from "../redux/reducers/User";

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
        // console.log("userData : ", data);
      })
      .catch((err) => console.log(err));
  }
}
