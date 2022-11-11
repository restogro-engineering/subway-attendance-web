export const setOfflineData = (key, data) => {
  if (data !== "" && data !== null && data !== undefined) {
    localStorage.setItem(`subwayofapproval:${key}`, JSON.stringify(data));
  }
};

export const getOfflineData = (key) => {
  const data = localStorage.getItem(`subwayofapproval:${key}`);
  if (data !== "" && data !== null && data !== undefined) {
    return JSON.parse(data);
  } else {
    return "";
  }
};

export const clearOfflineData = (key) => {
  localStorage.removeItem(`subwayofapproval:${key}`);
};

export const clearSpidleOfflineData = (startsWith) => {
  let myLength = startsWith.length;
  Object.keys(localStorage).forEach(function (key) {
    if (key.substring(0, myLength) === startsWith) {
      localStorage.removeItem(key);
    }
  });
};
