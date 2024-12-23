export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
}

export const pick = (obj, keys) => keys.reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});