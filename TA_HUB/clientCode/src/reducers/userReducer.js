import { SET_EMAIL,SET_USER_TYPE , SET_USER_NAME} from '../actions/userActions';

const initialState = {
  email: '',
  userType: '', // Initialize the userType field
  name: '',
};



const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
      case SET_USER_TYPE: // Handle the new action type
      return {
        ...state,
        userType: action.payload,
      };
      case SET_USER_NAME: // Handle the new action type for setting the user's name
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;