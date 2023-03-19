const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'UPDATE_AVATAR':
      return {
        ...state,
        profileimage: action.payload
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
