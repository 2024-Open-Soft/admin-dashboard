export const required = (data) => {
  let isRequired = false;
  Object.keys(data).forEach((key) => {
    if (
      data[key] === "" ||
      data[key] === null ||
      !data[key] ||
      Array.isArray(data[key]) & (data[key]?.length === 0)
    ) {
      isRequired = true;
      return;
    }
    if (typeof data[key] === "object" || Array.isArray(data[key])) {
      isRequired = required(data[key]);
    }
  });
  return isRequired;
};
