import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth({ data: JSON.parse(user) });
    }
  }, []);

  const login = (token, role, user) => {
    setAccessToken(token);
    setUserRole(role);
    setAuth({ data: user });
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAccessToken(null);
    setUserRole(null);
    setAuth({ data: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, accessToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;