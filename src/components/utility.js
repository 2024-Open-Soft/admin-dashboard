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
