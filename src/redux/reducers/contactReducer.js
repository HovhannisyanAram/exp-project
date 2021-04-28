import actionTypes from '../actionTypes';
import {
  isRequired,
  maxLength,
  minLength,
  emailValid,
} from "../../helpers/validators";

//validators
const maxLength25 = maxLength(25);
const minLength2 = minLength(2);


const initialState = {
  formData: {
    name: {
      value: "",
      error: null,
      valid: false,
    },
    email: {
      value: "",
      error: null,
      valid: false,
    },
    message: {
      value: "",
      error: null,
      valid: false,
    },
  }
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_INPUT_VALUE: {
      const { value, name } = action.target;
      let error = null;
      switch (name) {
        case "name":
        case "email":
        case "message":
          error =
            isRequired(value) ||
            (name === "email" && emailValid(value)) ||
            minLength2(value) ||
            maxLength25(value);
          break;
        default:
      }
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: {
            value,
            valid: !!!error,
            error,
          },
        }
      }
    }

    default: return state;
  }
};

export default contactReducer;