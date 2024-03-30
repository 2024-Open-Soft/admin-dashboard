import axios from "axios";
import { setUser } from "../redux/reducers/User";
import createToast from "../utils/createToast";

export const findSubscriptionStatus = (plans) => {
  const currentDate = new Date();

  let activePlan = null;
  let upcomingPlan = null;
  let latestExpiredPlan = null;

  for (const plan of plans) {
    const startDateObj = new Date(plan.startDate);
    const endDate = new Date(
      startDateObj.getTime() + plan.originalDuration * 24 * 60 * 60 * 1000
    );

    if (currentDate >= startDateObj && currentDate <= endDate) {
      activePlan = { ...plan, endDate };
    } else if (currentDate < startDateObj) {
      if (!upcomingPlan || startDateObj < new Date(upcomingPlan.startDate)) {
        upcomingPlan = { ...plan, endDate };
      }
    } else {
      if (
        !latestExpiredPlan ||
        endDate > new Date(latestExpiredPlan.startDate)
      ) {
        latestExpiredPlan = { ...plan, endDate };
      }
    }
  }

  return { activePlan, upcomingPlan, latestExpiredPlan };
};

export const subscriptionstartAndEndDate = (plan) => {
  const startDateObj = new Date(plan.startDate);
  //   console.log("plan.originalDuration : ", plan.orignalDuration);
  const endDate = new Date(
    startDateObj.getTime() + plan.orignalDuration * 24 * 60 * 60 * 1000
  );

  return { startDate: startDateObj, endDate };
};

export const logout = async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.get("/user/logout", config);
    dispatch(setUser(null));
    localStorage.removeItem("token");
    createToast("Logged out successfully", "success");
    return response;
  } catch (error) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    console.log(error?.response?.data?.error);
  }
};
