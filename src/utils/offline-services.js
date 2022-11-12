export const setOfflineData = (key, data) => {
  if (data !== "" && data !== null && data !== undefined) {
    localStorage.setItem(`subwayattendance:${key}`, JSON.stringify(data));
  }
};

export const getOfflineData = (key) => {
  const data = localStorage.getItem(`subwayattendance:${key}`);
  if (data !== "" && data !== null && data !== undefined) {
    return JSON.parse(data);
  } else {
    return "";
  }
};

export const clearOfflineData = (key) => {
  localStorage.removeItem(`subwayattendance:${key}`);
};

