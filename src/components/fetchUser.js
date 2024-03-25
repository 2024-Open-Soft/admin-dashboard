import axios from "axios";
import { setUser } from "../redux/reducers/User";

export async function fetchUserData(dispatch) {
  if (localStorage.getItem("userToken")) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    await axios
      .get(`/user`, config)
      .then(({ data }) => {
        dispatch(setUser(data));
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}
