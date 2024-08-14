const TokenService = {
  getToken(key: string) {
    return localStorage.getItem(key);
  },
  saveToken(key: string, token: string) {
    localStorage.setItem(key, token);
  },
  removeToken(key: string) {
    localStorage.removeItem(key);
  },
};

export default TokenService;
