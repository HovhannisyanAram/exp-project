import { createStore } from 'redux';


const initialState = {
  helloText: "Hello Redux",
  counter: 0,
  inputValue: ""
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "plusCount":
      return {
        ...state,
        counter: state.counter + 1
      };
      case "minusCount":
        return {
          ...state,
          counter: state.counter - 1
        };
      case "resetCount":
        return {
          ...state,
          counter: state.counter = 0
        };
      case "setInputValue":
        return {
          ...state,
          inputValue: action.inputValue
        };
      case "resetInput":
        return {
          ...state,
          inputValue: ""
        };
    default: return state;
  }
};

const store = createStore(reducer);
window.store = store;
export default store;
