export const signIn = (user) => {
  return async (dispatch) =>
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
};

export const signup = (user) => {
  return async (dispatch) =>
    dispatch({ type: 'SIGNUP_SUCCESS', payload: { user } });
};

export const verifyJWT = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('jwt')) {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch('http://localhost:5000/auth/verifyJWT', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JWT}`
          }
        });

        const data = await res.json();
        return dispatch({ type: 'VALID_TOKEN', payload: { data } });
      }
      return dispatch({ type: 'INVALID_TOKEN' });
    } catch (err) {
      console.log(err);
      return dispatch({ type: 'INVALID_TOKEN' });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('jwt');
    return dispatch({ type: 'LOGOUT' });
  };
};
