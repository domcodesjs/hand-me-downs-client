export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        'https://secure-citadel-31026.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();
      localStorage.setItem('jwt', data.token);

      if (!data.success) {
        return dispatch({ type: 'LOGIN_FAILURE', payload: { data } });
      }

      return dispatch({ type: 'LOGIN_SUCCESS', payload: { data } });
    } catch (err) {
      return dispatch({
        type: 'LOGIN_FAILURE',
        payload: { error: 'Could not sign in' }
      });
    }
  };
};

export const signup = (email, username, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        'https://cors-anywhere.herokuapp.com/https://secure-citadel-31026.herokuapp.com/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, username, password })
        }
      );

      const data = await res.json();
      localStorage.setItem('jwt', data.token);

      if (!data.success) {
        return dispatch({
          type: 'SIGNUP_FAILURE',
          payload: { error: 'Could not signup' }
        });
      }

      return dispatch({ type: 'SIGNUP_SUCCESS', payload: { data } });
    } catch (err) {
      return dispatch({
        type: 'SIGNUP_FAILURE',
        payload: { error: 'Could not signup' }
      });
    }
  };
};

export const verifyJWT = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('jwt')) {
        const JWT = localStorage.getItem('jwt');
        const res = await fetch(
          'https://secure-citadel-31026.herokuapp.com/auth/verifyJWT',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JWT}`
            }
          }
        );

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
