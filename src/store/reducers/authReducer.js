import produce from 'immer';

const initState = {
  user: null,
  error: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return (state = produce(state, (draftState) => {
        draftState.error = null;
        draftState.user = null;
      }));
    case 'VALID_TOKEN':
      return (state = produce(state, (draftState) => {
        draftState.error = null;
        draftState.user = action.payload.data;
      }));
    case 'INVALID_TOKEN':
      return (state = produce(state, (draftState) => {
        draftState.error = null;
        draftState.user = null;
      }));
    case 'LOGIN_SUCCESS':
      return (state = produce(state, (draftState) => {
        draftState.user = action.payload.user;
      }));
    case 'SIGNUP_SUCCESS':
      return (state = produce(state, (draftState) => {
        draftState.user = action.payload.user;
      }));
    default:
      return state;
  }
};

export default authReducer;
